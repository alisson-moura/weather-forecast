import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { GeocodingClient } from './weather-map-api/geocoding-client';
import { WeatherForecastClient } from './weather-map-api/weather-forecast-client';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [ConfigModule, HttpModule],
	controllers: [AppController],
	providers: [AppService, GeocodingClient, WeatherForecastClient],
})
export class AppModule {}
