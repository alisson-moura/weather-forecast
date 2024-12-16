import { ApiProperty } from '@nestjs/swagger';

import { CitiesResponseDto } from './cities-response-dto';

export class WeatherConditionDto {
	@ApiProperty({ description: 'Descrição do clima', example: 'nuvens dispersas' })
	description: string;

	@ApiProperty({ description: 'Ícone do clima', example: '04d' })
	icon: string;
}

export class WeatherDataDto {
	@ApiProperty({ description: 'Data e hora do clima prevista', example: '2024-12-15 12:00:00' })
	dt_txt: string;

	@ApiProperty({ description: 'Temperatura atual em Celsius', example: 25.5 })
	temp: number;

	@ApiProperty({ description: 'Sensação térmica em Celsius', example: 24.8 })
	feels_like: number;

	@ApiProperty({ description: 'Umidade em %', example: 85 })
	humidity: number;

	@ApiProperty({ description: 'Velocidade do vento em metros por segundo', example: 3.5 })
	wind_speed: number;

	@ApiProperty({ type: [WeatherConditionDto], description: 'Condições climáticas' })
	weather: WeatherConditionDto[];
}

export class ForecastResponseDto {
	@ApiProperty({ type: CitiesResponseDto, description: 'Informações da cidade' })
	city: CitiesResponseDto;

	@ApiProperty({ type: [WeatherDataDto], description: 'Dados climáticos previstos' })
	list: WeatherDataDto[];
}
