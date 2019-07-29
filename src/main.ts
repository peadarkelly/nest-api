import { NestFactory } from '@nestjs/core'
import { INestApplication } from '@nestjs/common'
import { AppModule } from 'src/app.module'
import { attachHeaders } from 'src/middleware/headers.middleware'
import { configureSwagger } from 'src/middleware/swagger.middleware'
import { PORT } from 'src/config'

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule)

  attachHeaders(app)
  configureSwagger(app)

  await app.listen(PORT)
}

bootstrap()
