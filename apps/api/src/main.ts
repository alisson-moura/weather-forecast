import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
		}),
	);
	app.enableVersioning();

	const config = new DocumentBuilder()
		.setTitle('Weather Forecast')
		.setDescription('Weather forecast API')
		.setVersion('1.0')
		.build();
	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, documentFactory);

	await app.listen(3000);
}
bootstrap();
