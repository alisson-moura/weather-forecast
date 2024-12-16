import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';

import { UserServices } from '../users.service';

import { Strategy } from 'passport-local';

@Injectable()
export class AuthLocalStrategy extends PassportStrategy(Strategy) {
	constructor(private userService: UserServices) {
		super({ usernameField: 'email' });
	}

	async validate(email: string, password: string): Promise<User> {
		const user = await this.userService.findByEmail(email);

		if (!user || !this.userService.checkCredentials({ email, password, user })) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
