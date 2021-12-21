import { serverEnv } from '@env/server'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'
import * as path from 'path'
import { NotFoundExceptionFilter } from './exception-filters/not-found'
import { AppModule } from './module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useGlobalFilters(new NotFoundExceptionFilter())
  app.useStaticAssets(path.join(`${__dirname}/../../dist/client`))
  app.use(cookieParser())

  if (import.meta.env.DEV) {
    app.use(cors())
  }

  await app.listen(serverEnv.serverPort, serverEnv.host)
}
bootstrap()
