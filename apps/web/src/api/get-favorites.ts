export interface FavoriteCity {
	city: {
		id: number;
		name: string;
		state: string;
		lat: number;
		lon: number;
	};
	userId: number;
	cityId: number;
}

export async function getFavoriteCities(token: string): Promise<FavoriteCity[]> {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/favorites`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error('Erro ao buscar cidades favoritas.');
	}

	return response.json();
}
