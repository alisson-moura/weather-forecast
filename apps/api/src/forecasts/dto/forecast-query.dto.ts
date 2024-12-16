import { IsNumberString } from 'class-validator';

export class ForecastQueryDto {
	@IsNumberString({}, { message: 'Latitude deve ser um número válido' })
	lat: string;

	@IsNumberString({}, { message: 'Longitude deve ser um número válido' })
	lon: string;
}
