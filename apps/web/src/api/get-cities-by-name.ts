export interface City {
	name: string;
	state: string;
	lat: number;
	lon: number;
}

export interface NotFound {
	statusCode: number;
	message: string;
	error: string;
}

export async function getCitiesByName(name: string): Promise<City[]> {
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/cities?${new URLSearchParams({ name })}`,
	);
	if (!response.ok) {
		const errorMessage = await response.json();
		throw new Error(errorMessage.message);
	}

	return response.json();
}
