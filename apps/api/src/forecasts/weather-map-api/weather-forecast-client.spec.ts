import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { WeatherForecastClient } from './weather-forecast-client';

import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { of } from 'rxjs';

jest.mock('@nestjs/axios');

describe('WeatherForecastClient', () => {
	let weatherForecastClient: WeatherForecastClient;
	let httpService: jest.Mocked<HttpService>;
	let configService: jest.Mocked<ConfigService>;
	let mockResponse: AxiosResponse;

	beforeEach(() => {
		httpService = {
			get: jest.fn(),
		} as unknown as jest.Mocked<HttpService>;

		configService = {
			getOrThrow: jest.fn().mockImplementation((key: string) => {
				switch (key) {
					case 'API_WEATHER_FORECAST_BASE_URL':
						return 'https://api.openweathermap.org/data/2.5/forecast';
					case 'OPENWEATHER_LANG_CODE':
						return 'pt_br';
					case 'OPENWEATHER_UNIT':
						return 'metric';
					case 'OPENWEATHER_API_KEY':
						return 'test-api-key';
				}
			}),
		} as unknown as jest.Mocked<ConfigService>;

		mockResponse = {
			data: { cod: '200', list: [] },
			status: 200,
			statusText: 'OK',
			headers: {},
			config: {} as InternalAxiosRequestConfig,
		};

		weatherForecastClient = new WeatherForecastClient(httpService, configService);
	});

	it('deve buscar previsão de 5 dias com sucesso', async () => {
		httpService.get.mockReturnValueOnce(of(mockResponse));

		const forecasts = await weatherForecastClient.getFiveDays(51.5074, -0.1278);

		expect(forecasts.cod).toBe('200');
		expect(httpService.get).toHaveBeenCalledWith(
			configService.getOrThrow('API_WEATHER_FORECAST_BASE_URL'),
			{
				params: {
					lat: 51.5074,
					lon: -0.1278,
					lang: configService.getOrThrow('OPENWEATHER_LANG_CODE'),
					units: configService.getOrThrow('OPENWEATHER_UNIT'),
					appid: configService.getOrThrow('OPENWEATHER_API_KEY'),
				},
			},
		);
	});
});
