import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'

export function configureSwagger(app: INestApplication): void {
  const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('NestJS example API')
    .setDescription('NestJS API description')
    .setVersion('1.0')
    .build()

  const document: OpenAPIObject = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('docs', app, document)
}
