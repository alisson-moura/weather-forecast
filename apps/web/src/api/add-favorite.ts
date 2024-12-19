export interface FavoriteCityRequest {
	name: string;
	state: string;
	lat: number;
	lon: number;
}

export async function addFavoriteCity({
	token,
	city,
}: {
	token: string | null;
	city: FavoriteCityRequest;
}): Promise<void> {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/favorites`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(city),
	});

	if (!response.ok) {
		throw new Error('Erro ao adicionar cidade aos favoritos.');
	}
}
