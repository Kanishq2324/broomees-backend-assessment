import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import  express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';

export async function createServer() {
  const server = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.init();
  return server;
}
