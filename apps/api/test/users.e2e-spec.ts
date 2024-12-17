import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/users/prisma.service';

import * as request from 'supertest';

describe('User Creation (e2e)', () => {
	let app: INestApplication;
	let prismaService: PrismaService;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		app.enableVersioning();
		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
			}),
		);

		prismaService = app.get(PrismaService);
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	describe('POST /users (User Creation)', () => {
		const validUserData = {
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'StrongPassword123!',
		};

		it('should create a user successfully', async () => {
			await request(app.getHttpServer()).post('/v1/users').send(validUserData).expect(201);

			const userInDb = await prismaService.user.findUnique({
				where: { email: validUserData.email },
			});
			expect(userInDb).toBeTruthy();
		});

		it('should not create a user with duplicate email', async () => {
			await prismaService.user.create({
				data: validUserData,
			});

			const response = await request(app.getHttpServer())
				.post('/v1/users')
				.send(validUserData)
				.expect(400);

			expect(response.body.message).toContain('O E-mail fornecido já está em uso.');
		});
	});
});
