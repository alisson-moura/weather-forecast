import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [ConfigModule, HttpModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
