export const mockGeocodingClient = {
	findByName: jest.fn().mockImplementation((name: string) => {
		if (name === 'São José do Rio Preto') {
			return Promise.resolve([
				{
					name: 'São José do Rio Preto',
					lat: -20.8167,
					lon: -49.3833,
				},
			]);
		}
		if (name === 'CidadeInexistente123') {
			return Promise.resolve([]);
		}
		return Promise.resolve([]);
	}),
};
