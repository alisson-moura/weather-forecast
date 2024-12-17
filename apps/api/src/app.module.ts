import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ConfigModule } from './config/config.module';
import { AppController } from './forecasts/forecasts.controller';
import { GeocodingClient } from './forecasts/weather-map-api/geocoding-client';
import { WeatherForecastClient } from './forecasts/weather-map-api/weather-forecast-client';
import { AuthController } from './users/auth/auth.controller';
import { AuthService } from './users/auth/auth.service';
import { JwtStrategy } from './users/auth/jwt.strategy';
import { AuthLocalStrategy } from './users/auth/local.strategy';
import { FavoritesController } from './users/favorites.controller';
import { FavoritesService } from './users/favorites.service';
import { PrismaService } from './users/prisma.service';
import { UsersController } from './users/users.controller';
import { UserServices } from './users/users.service';

@Module({
	imports: [
		ConfigModule,
		PassportModule,
		HttpModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.getOrThrow<string>('JWT_SECRET'),
				signOptions: { expiresIn: configService.getOrThrow<number>('JWT_EXPIRES_IN') },
			}),
		}),
	],
	controllers: [AppController, UsersController, AuthController, FavoritesController],
	providers: [
		GeocodingClient,
		WeatherForecastClient,
		UserServices,
		AuthService,
		FavoritesService,
		PrismaService,
		AuthLocalStrategy,
		JwtStrategy,
	],
})
export class AppModule {}
