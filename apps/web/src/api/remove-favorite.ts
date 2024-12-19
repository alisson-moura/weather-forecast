export async function removeFavoriteCity(token: string, cityId: number): Promise<void> {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/favorites/${cityId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error('Erro ao remover a cidade dos favoritos.');
	}
}
