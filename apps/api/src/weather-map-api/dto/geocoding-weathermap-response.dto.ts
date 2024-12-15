import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

class LocalNamesDto {
	[key: string]: string;
}

export class GeocodingWeatherMapAPIResponseDto {
	@IsString()
	name: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => LocalNamesDto)
	local_names?: LocalNamesDto;

	@IsNumber()
	lat: number;

	@IsNumber()
	lon: number;

	@IsString()
	country: string;

	@IsOptional()
	@IsString()
	state?: string;
}
