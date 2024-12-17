import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateCityDto {
	@ApiProperty({ description: 'Nome da cidade' })
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({ description: 'Nome do estado' })
	@IsString()
	@IsNotEmpty()
	state: string;

	@ApiProperty({ description: 'Latitude' })
	@IsNumber()
	@Min(-90)
	@Max(90)
	lat: number;

	@ApiProperty({ description: 'Longitude' })
	@IsNumber()
	@Min(-180)
	@Max(180)
	lon: number;
}

export class FavoriteCityResponseDto {
	@ApiProperty({ description: 'Detalhes da cidade' })
	city: CreateCityDto & { id: number };

	@ApiProperty({ description: 'Id do usuário' })
	userId: number;

	@ApiProperty({ description: 'Id da cidade' })
	cityId: number;
}
