import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config =  new DocumentBuilder()
  .setTitle("Api Gateway")
  .setDescription('Gateway api for Orders and Auth microservice.')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('api',app,document)

  await app.listen(process.env.PORT ?? 3000);

  console.log("API Gateway is listening to port 3000.");
  console.log("Swagger docs at http://localhost:3000/api");
  
  
}
bootstrap();
