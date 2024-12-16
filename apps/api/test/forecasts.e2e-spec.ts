import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { WeatherForecastClient } from '../src/forecasts/weather-map-api/weather-forecast-client';

import { mockWeatherForecastClient } from './mocks/weather-forecast-client.mock';

import * as request from 'supertest';

describe('Get forecast by lat and lon', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture = await Test.createTestingModule({
			imports: [AppModule],
		})
			.overrideProvider(WeatherForecastClient)
			.useValue(mockWeatherForecastClient)
			.compile();

		app = moduleFixture.createNestApplication();
		app.enableVersioning();
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	it('/v1/forecasts (GET)', async () => {
		const result = await request(app.getHttpServer()).get('/v1/forecasts').query({
			lat: '-20.8141411',
			lon: '-49.507449',
		});

		expect(result.status).toBe(200);
		expect(result.body).toMatchObject({
			city: {
				name: expect.any(String),
				lat: expect.any(Number),
				lon: expect.any(Number),
			},
			list: expect.any(Array),
		});
	});
});
