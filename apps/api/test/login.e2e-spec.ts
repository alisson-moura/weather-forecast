import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/users/prisma.service';

import * as bcrypt from 'bcrypt';
import * as request from 'supertest';

describe('Authentication (e2e)', () => {
	let app: INestApplication;
	let prismaService: PrismaService;
	let configService: ConfigService;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				transform: true,
			}),
		);
		app.enableVersioning();

		prismaService = app.get(PrismaService);
		configService = app.get(ConfigService);
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	beforeEach(async () => {
		await prismaService.user.deleteMany();

		await prismaService.user.create({
			data: {
				name: 'Usuário Teste',
				email: 'teste2@exemplo.com',
				password: await bcrypt.hash(
					'senhaCorreta123',
					configService.getOrThrow('BCRYPT_SALT_ROUNDS'),
				),
			},
		});
	});

	describe('POST /v1/auth/login', () => {
		const loginEndpoint = '/v1/auth/login';

		it('Deve realizar login com sucesso e retornar access_token', async () => {
			const response = await request(app.getHttpServer())
				.post(loginEndpoint)
				.send({
					email: 'teste2@exemplo.com',
					password: 'senhaCorreta123',
				})
				.expect(201);

			expect(response.body).toHaveProperty('access_token');
			expect(response.body.access_token.length).toBeGreaterThan(0);
		});

		it('Deve retornar 401 para e-mail inválido', async () => {
			await request(app.getHttpServer())
				.post(loginEndpoint)
				.send({
					email: 'emailnaocadastrado@exemplo.com',
					password: 'senhaCorreta123',
				})
				.expect(401);
		});

		it('Deve retornar 401 para senha inválida', async () => {
			await request(app.getHttpServer())
				.post(loginEndpoint)
				.send({
					email: 'teste@exemplo.com',
					password: 'senhaIncorreta',
				})
				.expect(401);
		});
	});
});
