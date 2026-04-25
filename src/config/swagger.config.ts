import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Nest JS course')
    .setDescription('API documentation for nest js course')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
}
