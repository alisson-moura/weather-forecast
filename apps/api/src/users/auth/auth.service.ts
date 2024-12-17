import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserPayload } from './user.decorator';

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) {}
	async login(user: UserPayload) {
		const payload = { email: user.email, sub: user.id };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
