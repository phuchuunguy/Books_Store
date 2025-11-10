import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const packageJson = require('../package.json');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173', // Cho frontend dev local
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('BookStore API')
    .setDescription('Docs API BookStore')
    .setVersion(packageJson.version)
    .addBearerAuth()
    .build()  

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: false}));
  await app.listen(process.env.PORT ?? 3000, '0.0.0.00');
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log('Listening on http://localhost:3000');
}
bootstrap();
