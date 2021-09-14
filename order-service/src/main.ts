/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const logger = new Logger('Main')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);

}
bootstrap();

//npx @nestjs/cli g module order 
//npx @nestjs/cli g controller order --no-spec
//npx @nestjs/cli g service order --no-spec
