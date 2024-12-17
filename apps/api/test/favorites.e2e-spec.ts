import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { AuthService } from '../src/users/auth/auth.service';
import { PrismaService } from '../src/users/prisma.service';

import * as bcrypt from 'bcrypt';
import * as request from 'supertest';

describe('FavoritesController (e2e)', () => {
	let app: INestApplication;
	let prismaService: PrismaService;
	let configService: ConfigService;
	let authService: AuthService;
	let accessToken: string;

	const city = {
		name: 'São Paulo',
		state: 'SP',
		lat: -23.5505,
		lon: -46.6333,
	};

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();
		app = moduleFixture.createNestApplication();
		app.enableVersioning();
		app.useGlobalPipes(
			new ValidationPipe({
				transform: true,
				whitelist: true,
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
		const user = await prismaService.user.create({
			data: {
				name: 'Usuário Teste',
				email: 'teste@exemplo.com',
				password: await bcrypt.hash(
					'senhaCorreta123',
					configService.getOrThrow('BCRYPT_SALT_ROUNDS'),
				),
			},
		});

		const { access_token } = await authService.login(user);
		accessToken = access_token;
	});

	describe('POST /v1/favorites', () => {
		it('deve adicionar uma cidade favorita com sucesso', async () => {
			await request(app.getHttpServer())
				.post('/v1/favorites')
				.set('Authorization', `Bearer ${accessToken}`)
				.send(city)
				.expect(201);
		});
	});

	describe('GET /favorites', () => {
		it('deve listar cidades favoritas do usuário', async () => {
			await request(app.getHttpServer())
				.post('/v1/favorites')
				.set('Authorization', `Bearer ${accessToken}`)
				.send(city);

			const response = await request(app.getHttpServer())
				.get('/v1/favorites')
				.set('Authorization', `Bearer ${accessToken}`)
				.expect(200);

			expect(Array.isArray(response.body)).toBe(true);
			expect(response.body.length).toBeGreaterThan(0);
		});
	});

	describe('DELETE /favorites/:cityId', () => {
		let cityIdToRemove: number;

		beforeEach(async () => {
			const response = await request(app.getHttpServer())
				.post('/v1/favorites')
				.set('Authorization', `Bearer ${accessToken}`)
				.send(city);

			cityIdToRemove = response.body.cityId;
		});

		it('deve remover cidade favorita com sucesso', async () => {
			await request(app.getHttpServer())
				.delete(`/v1/favorites/${cityIdToRemove}`)
				.set('Authorization', `Bearer ${accessToken}`)
				.expect(200);

			const listResponse = await request(app.getHttpServer())
				.get('/v1/favorites')
				.set('Authorization', `Bearer ${accessToken}`)
				.expect(200);

			const removedCity = listResponse.body.find(
				(fav: { cityId: number }) => fav.cityId === cityIdToRemove,
			);
			expect(removedCity).toBeUndefined();
		});
	});
});
