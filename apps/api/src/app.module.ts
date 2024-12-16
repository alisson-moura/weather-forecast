import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { AppController } from './forecasts/forecasts.controller';
import { GeocodingClient } from './forecasts/weather-map-api/geocoding-client';
import { WeatherForecastClient } from './forecasts/weather-map-api/weather-forecast-client';
import { PrismaService } from './users/prisma.service';
import { UsersController } from './users/users.controller';
import { UserServices } from './users/users.service';

@Module({
	imports: [ConfigModule, HttpModule],
	controllers: [AppController, UsersController],
	providers: [GeocodingClient, WeatherForecastClient, UserServices, PrismaService],
})
export class AppModule {}
