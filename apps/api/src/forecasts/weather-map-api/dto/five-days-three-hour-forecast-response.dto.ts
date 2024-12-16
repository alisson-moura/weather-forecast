import { Type } from 'class-transformer';

export class WeatherForecastCoordDto {
	readonly lat: number;
	readonly lon: number;
}

export class WeatherConditionDto {
	readonly id: number;
	readonly main: string;
	readonly description: string;
	readonly icon: string;
}

export class WeatherMainDataDto {
	readonly temp: number;
	readonly feels_like: number;
	readonly temp_min: number;
	readonly temp_max: number;
	readonly pressure: number;
	readonly sea_level?: number;
	readonly grnd_level?: number;
	readonly humidity: number;
	readonly temp_kf?: number;
}

export class WeatherWindDto {
	readonly speed: number;
	readonly deg: number;
	readonly gust?: number;
}

export class WeatherRainDto {
	readonly '3h'?: number;
}

export class WeatherSnowDto {
	readonly '3h'?: number;
}

export class WeatherSysDto {
	readonly pod?: string;
}

export class WeatherForecastListItemDto {
	readonly dt: number;

	@Type(() => WeatherMainDataDto)
	readonly main: WeatherMainDataDto;

	@Type(() => WeatherConditionDto)
	readonly weather: WeatherConditionDto[];

	@Type(() => WeatherWindDto)
	readonly wind: WeatherWindDto;

	readonly clouds?: number;
	readonly visibility?: number;
	readonly pop?: number;

	@Type(() => WeatherRainDto)
	readonly rain?: WeatherRainDto;

	@Type(() => WeatherSnowDto)
	readonly snow?: WeatherSnowDto;

	@Type(() => WeatherSysDto)
	readonly sys?: WeatherSysDto;

	readonly dt_txt: string;
}

export class WeatherForecastCityDto {
	readonly id?: number;
	readonly name: string;

	@Type(() => WeatherForecastCoordDto)
	readonly coord: WeatherForecastCoordDto;

	readonly country: string;
	readonly population?: number;
	readonly timezone?: number;
	readonly sunrise?: number;
	readonly sunset?: number;
}

export class FiveDaysThreeHourForecastDto {
	readonly cod?: string;
	readonly message?: string;
	readonly cnt?: number;

	@Type(() => WeatherForecastListItemDto)
	readonly list: WeatherForecastListItemDto[];

	@Type(() => WeatherForecastCityDto)
	readonly city: WeatherForecastCityDto;
}
