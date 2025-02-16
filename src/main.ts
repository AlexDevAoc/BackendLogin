import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
      })
  );

  const config = new DocumentBuilder()
    .setTitle('Login Backend')
    .setDescription('Documentation of login')
    .setVersion('1.0')
    .addBearerAuth( { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token', )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/explorer', app, document)

  await app.listen(process.env.PORT);
  logger.log(`App running on port ${ process.env.PORT }`);
}
bootstrap();
