export const mockWeatherForecastClient = {
	getFiveDays: jest.fn().mockImplementation((lat: number, lon: number) => {
		if (lat === -20.8167 && lon === -49.3833) {
			return Promise.resolve({
				city: {
					name: 'São José do Rio Preto',
					coord: { lat: -20.8167, lon: -49.3833 },
					country: 'BR',
				},
				list: [
					{
						dt: 1672549200,
						main: {
							temp: 25.5,
							feels_like: 24.8,
							temp_min: 25.0,
							temp_max: 26.0,
							pressure: 1013,
							humidity: 85,
						},
						weather: [
							{
								id: 801,
								main: 'Clouds',
								description: 'nuvens dispersas',
								icon: '03d',
							},
						],
						wind: {
							speed: 3.5,
							deg: 150,
						},
						dt_txt: '2024-12-15 12:00:00',
					},
				],
			});
		}
		return Promise.resolve({
			city: {
				name: '',
				coord: { lat: 0, lon: 0 },
				country: '',
			},
			list: [],
		});
	}),
};
