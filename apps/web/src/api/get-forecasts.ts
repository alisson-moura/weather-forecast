export interface Forecasts {
	city: City;
	list: List[];
}

export interface City {
	name: string;
	lat: number;
	lon: number;
}

export interface List {
	dt_txt: string;
	temp: number;
	feels_like: number;
	humidity: number;
	wind_speed: number;
	weather: Weather[];
}

export interface Weather {
	description: string;
	icon: string;
}

export async function getForecasts({ lat, lon }: { lat: number; lon: number }): Promise<Forecasts> {
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/forecasts?${new URLSearchParams({ lat: `${lat}`, lon: `${lon}` })}`,
	);
	if (!response.ok) {
		const errorMessage = await response.json();
		throw new Error(errorMessage.message);
	}

	return response.json();
}
