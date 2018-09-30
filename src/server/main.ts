import * as cors from 'cors'
import * as path from 'path'
import { NestFactory } from '@nestjs/core'
import { serverEnv } from '@env/server'
import { NotFoundExceptionFilter } from './exception-filters/not-found'
import { AppModule } from './module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalFilters(new NotFoundExceptionFilter())
  app.useStaticAssets(path.join(`${__dirname}/../../dist/client`))

  if (process.env.NODE_ENV !== 'production') {
    app.use(cors())
  }

  await app.listen(serverEnv.serverPort, serverEnv.host)
}
bootstrap()
