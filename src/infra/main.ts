import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn'] })

  const envSerice = app.get(EnvService)
  const port = envSerice.get('PORT')

  await app.listen(port)
}
void bootstrap()
