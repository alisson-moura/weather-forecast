import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { GeocodingClient } from '../src/weather-map-api/geocoding-client';

import { mockGeocodingClient } from './mocks/geocoding-client.mock';

import * as request from 'supertest';

describe('Get cities by name', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture = await Test.createTestingModule({
			imports: [AppModule],
		})
			.overrideProvider(GeocodingClient)
			.useValue(mockGeocodingClient)
			.compile();

		app = moduleFixture.createNestApplication();
		app.enableVersioning()
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	it('/v1/cities (GET)', async () => {
		const result = await request(app.getHttpServer()).get('/v1/cities').query({
			name: `São José do Rio Preto`,
		});

		expect(result.status).toBe(200);
		expect(result.body).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					name: expect.any(String),
					lat: expect.any(Number),
					lon: expect.any(Number),
				}),
			]),
		);
	});

	it('/v1/cities (GET) - Cidade não encontrada', async () => {
		const result = await request(app.getHttpServer()).get('/v1/cities').query({
			name: 'CidadeInexistente123',
		});

		expect(result.status).toBe(404);
		expect(result.body).toEqual({
			error: 'Not Found',
			statusCode: 404,
			message: 'Cidade não encontrada',
		});
	});
});
