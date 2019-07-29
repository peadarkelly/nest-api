import { SwaggerModule, DocumentBuilder, SwaggerDocument, SwaggerBaseConfig } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'

export function configureSwagger(app: INestApplication): void {
  const options: SwaggerBaseConfig = new DocumentBuilder()
    .setTitle('NestJS example API')
    .setDescription('NestJS API description')
    .setVersion('1.0')
    .build()

  const document: SwaggerDocument = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('docs', app, document)
}
