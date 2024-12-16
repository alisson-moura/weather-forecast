import { ApiProperty } from '@nestjs/swagger';

export class CitiesResponseDto {
	@ApiProperty({
		description: 'Nome da cidade',
		example: 'São José dos Campos',
	})
	name: string;

	@ApiProperty({
		description: 'Nome do Estado',
		example: 'São Paulo',
	})
	state?: string;

	@ApiProperty({
		description: 'Latitude da cidade',
		example: -23.1896,
	})
	lat: number;

	@ApiProperty({
		description: 'Longitude da cidade',
		example: -45.8841,
	})
	lon: number;
}
