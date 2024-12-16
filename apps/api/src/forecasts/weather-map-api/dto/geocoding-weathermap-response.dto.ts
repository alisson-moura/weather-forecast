import { Type } from 'class-transformer';

class LocalNamesDto {
	[key: string]: string;
}

export class GeocodingWeatherMapAPIResponseDto {
	readonly name: string;

	@Type(() => LocalNamesDto)
	readonly local_names?: LocalNamesDto;

	readonly lat: number;
	readonly lon: number;
	readonly country: string;
	readonly state?: string;
}
