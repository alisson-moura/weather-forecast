import { plainToInstance } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, IsUrl, validateSync } from 'class-validator';

export class EnvironmentVariables {
	@IsString()
	@IsNotEmpty()
	OPENWEATHER_API_KEY: string;

	@IsString()
	@IsNotEmpty()
	OPENWEATHER_COUNTRY_CODE: string;

	@IsUrl()
	@IsNotEmpty()
	API_GEO_BASE_URL: string;

	@IsString()
	@IsNotEmpty()
	OPENWEATHER_LANG_CODE: string;

	@IsUrl()
	@IsNotEmpty()
	API_WEATHER_FORECAST_BASE_URL: string;

	@IsString()
	@IsNotEmpty()
	OPENWEATHER_UNIT: string;

	@IsInt()
	PORT: number;

	@IsInt()
	BCRYPT_SALT_ROUNDS: number;
}

export function validateEnv(config: Record<string, unknown>) {
	const validatedConfig = plainToInstance(EnvironmentVariables, config, {
		enableImplicitConversion: true,
	});

	const errors = validateSync(validatedConfig, {
		skipMissingProperties: false,
	});

	if (errors.length > 0) {
		throw new Error(
			`Configuração inválida:\n${errors.map((err) => JSON.stringify(err.constraints)).join('\n')}`,
		);
	}

	return validatedConfig;
}
