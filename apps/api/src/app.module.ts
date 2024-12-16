import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { AppController } from './forecasts/forecasts.controller';
import { GeocodingClient } from './forecasts/weather-map-api/geocoding-client';
import { WeatherForecastClient } from './forecasts/weather-map-api/weather-forecast-client';
import { PrismaService } from './users/prisma.service';

@Module({
	imports: [ConfigModule, HttpModule],
	controllers: [AppController],
	providers: [GeocodingClient, WeatherForecastClient, PrismaService],
})
export class AppModule {}
