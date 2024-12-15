import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { GeocodingClient } from './geocoding-client';

import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { of } from 'rxjs';

jest.mock('@nestjs/axios');

describe('Geocoding API Client', () => {
	let geocodingClient: GeocodingClient;
	let httpService: jest.Mocked<HttpService>;
	let configService: jest.Mocked<ConfigService>;
	let mockResponse: AxiosResponse;

	beforeEach(() => {
		httpService = new HttpService() as jest.Mocked<HttpService>;
		configService = {
			getOrThrow: jest.fn().mockImplementation((key: string) => {
				switch (key) {
					case 'OPENWEATHER_API_KEY':
						return 'test-api-key';
					case 'API_GEO_BASE_URL':
						return 'https://api.openweathermap.org';
					case 'OPENWEATHER_COUNTRY_CODE':
						return 'BR';
					default:
						throw new Error(`Config key ${key} not found`);
				}
			}),
		} as unknown as jest.Mocked<ConfigService>;

		geocodingClient = new GeocodingClient(httpService, configService);

		mockResponse = {
			data: [],
			status: 200,
			statusText: 'OK',
			headers: {},
			config: {} as InternalAxiosRequestConfig,
		};
	});

	it('Deve retornar duas localidades corretamente', async () => {
		mockResponse.data = [
			{ name: 'Rio Preto', lat: 51.5074, lon: -0.1278 },
			{ name: 'Votuporanga', lat: 40.7128, lon: -74.006 },
		];
		httpService.get.mockReturnValueOnce(of(mockResponse));

		const locations = await geocodingClient.findByName('qualquer_nome');

		expect(locations.length).toBe(2);
	});

	it('Deve retornar um array vazio quando não houver resultados', async () => {
		mockResponse.data = [];
		httpService.get.mockReturnValueOnce(of(mockResponse));

		const locations = await geocodingClient.findByName('nome_invalido');

		expect(locations).toEqual([]);
	});
});
