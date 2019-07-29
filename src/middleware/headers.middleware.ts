import * as helmet from 'helmet'
import { INestApplication } from '@nestjs/common'

export function attachHeaders(app: INestApplication): void {
  const oneYearInSeconds = 31536000

  app.use(helmet())
  app.use(helmet.noCache())
  app.use(helmet.noSniff())
  app.use(helmet.hidePoweredBy())
  app.use(helmet.referrerPolicy())
  app.use(helmet.xssFilter())
  app.use(helmet.frameguard({ action: 'deny' }))
  app.use(helmet.hsts({ maxAge: oneYearInSeconds }))
}
