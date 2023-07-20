import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      '*',
      'https://angular-blog-with-social-authentication-authorization.vercel.app',
      'http://localhost:3000',
      'http://localhost:4200',
      'http://localhost:4000',
    ],
    allowedHeaders: '*',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
