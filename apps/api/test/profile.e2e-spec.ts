import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { AuthService } from '../src/users/auth/auth.service';
import { PrismaService } from '../src/users/prisma.service';

import * as bcrypt from 'bcrypt';
import * as request from 'supertest';

describe('Profile Endpoint (e2e)', () => {
	let app: INestApplication;
	let prismaService: PrismaService;
	let configService: ConfigService;
	let authService: AuthService;

	let testUser: { id: number; email: string; name: string; password: string };
	let accessToken: string;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		app.enableVersioning();
		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				transform: true,
			}),
		);

		prismaService = app.get(PrismaService);
		configService = app.get(ConfigService);
		authService = app.get(AuthService);

		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	beforeEach(async () => {
		testUser = await prismaService.user.create({
			data: {
				name: 'Usuário Teste',
				email: 'teste@exemplo.com',
				password: await bcrypt.hash(
					'senhaCorreta123',
					configService.getOrThrow('BCRYPT_SALT_ROUNDS'),
				),
			},
		});

		accessToken = (await authService.login(testUser)).access_token;
	});

	describe('GET /v1/auth/profile', () => {
		it('Deve retornar perfil do usuário autenticado', async () => {
			const response = await request(app.getHttpServer())
				.get('/v1/auth/profile')
				.set('Authorization', `Bearer ${accessToken}`)
				.expect(200);

			expect(response.body).toEqual({
				id: testUser.id,
				email: testUser.email,
				name: testUser.name,
			});
		});

		it('Deve retornar 401 sem token de autenticação', async () => {
			await request(app.getHttpServer()).get('/v1/auth/profile').expect(401);
		});

		it('Deve retornar 401 com token inválido', async () => {
			await request(app.getHttpServer())
				.get('/v1/auth/profile')
				.set('Authorization', 'Bearer tokeninvalido123')
				.expect(401);
		});
	});
});
