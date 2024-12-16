import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from './prisma.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserServices {
	constructor(
		private prismaService: PrismaService,
		private configService: ConfigService,
	) {}

	async create(input: Prisma.UserCreateInput): Promise<void> {
		const emailAlreadyInUse = await this.findByEmail(input.email);
		if (emailAlreadyInUse) throw new BadRequestException('O E-mail fornecido já está em uso.');

		const hash = await bcrypt.hash(
			input.password,
			this.configService.getOrThrow<number>('BCRYPT_SALT_ROUNDS'),
		);
		await this.prismaService.user.create({
			data: {
				...input,
				password: hash,
			},
		});
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.prismaService.user.findUnique({
			where: {
				email,
			},
		});
		return user;
	}

	checkCredentials(input: { email: string; password: string; user: User }): boolean {
		if (input.email != input.user.email) {
			return false;
		}
		return bcrypt.compareSync(input.password, input.user.password);
	}
}
