import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class WeatherForecastCoordDto {
	@IsNumber()
	lat: number;

	@IsNumber()
	lon: number;
}

export class WeatherConditionDto {
	@IsNumber()
	id: number;

	@IsString()
	main: string;

	@IsString()
	description: string;

	@IsString()
	icon: string;
}

export class WeatherMainDataDto {
	@IsNumber()
	temp: number;

	@IsNumber()
	feels_like: number;

	@IsNumber()
	temp_min: number;

	@IsNumber()
	temp_max: number;

	@IsNumber()
	pressure: number;

	@IsNumber()
	@IsOptional()
	sea_level?: number;

	@IsNumber()
	@IsOptional()
	grnd_level?: number;

	@IsNumber()
	humidity: number;

	@IsNumber()
	@IsOptional()
	temp_kf?: number;
}

export class WeatherWindDto {
	@IsNumber()
	speed: number;

	@IsNumber()
	deg: number;

	@IsNumber()
	@IsOptional()
	gust?: number;
}

export class WeatherRainDto {
	@IsNumber()
	@IsOptional()
	'3h'?: number;
}

export class WeatherSnowDto {
	@IsNumber()
	@IsOptional()
	'3h'?: number;
}

export class WeatherSysDto {
	@IsString()
	@IsOptional()
	pod?: string;
}

export class WeatherForecastListItemDto {
	@IsNumber()
	dt: number;

	@ValidateNested()
	@Type(() => WeatherMainDataDto)
	main: WeatherMainDataDto;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => WeatherConditionDto)
	weather: WeatherConditionDto[];

	@ValidateNested()
	@Type(() => WeatherWindDto)
	wind: WeatherWindDto;

	@IsNumber()
	@IsOptional()
	clouds?: number;

	@IsNumber()
	@IsOptional()
	visibility?: number;

	@IsNumber()
	@IsOptional()
	pop?: number;

	@ValidateNested()
	@Type(() => WeatherRainDto)
	@IsOptional()
	rain?: WeatherRainDto;

	@ValidateNested()
	@Type(() => WeatherSnowDto)
	@IsOptional()
	snow?: WeatherSnowDto;

	@ValidateNested()
	@Type(() => WeatherSysDto)
	@IsOptional()
	sys?: WeatherSysDto;

	@IsString()
	dt_txt: string;
}

export class WeatherForecastCityDto {
	@IsNumber()
	@IsOptional()
	id?: number;

	@IsString()
	name: string;

	@ValidateNested()
	@Type(() => WeatherForecastCoordDto)
	coord: WeatherForecastCoordDto;

	@IsString()
	country: string;

	@IsNumber()
	@IsOptional()
	population?: number;

	@IsNumber()
	@IsOptional()
	timezone?: number;

	@IsNumber()
	@IsOptional()
	sunrise?: number;

	@IsNumber()
	@IsOptional()
	sunset?: number;
}

export class FiveDaysThreeHourForecastDto {
	@IsString()
	@IsOptional()
	cod?: string;

	@IsString()
	@IsOptional()
	message?: string;

	@IsNumber()
	@IsOptional()
	cnt?: number;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => WeatherForecastListItemDto)
	list: WeatherForecastListItemDto[];

	@ValidateNested()
	@Type(() => WeatherForecastCityDto)
	city: WeatherForecastCityDto;
}
