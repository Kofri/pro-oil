import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { log } from 'console';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true, logger: ['error', 'debug'] });
  const config = new DocumentBuilder()
  .setTitle('oil shop')
  .setDescription('The shop web-team oil API description')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = process.env.SERVER_PORT || 3001
  await app.listen(port);
  log(`http://127.0.0.1:${port}`, process.env.NODE_ENV);
}
bootstrap();