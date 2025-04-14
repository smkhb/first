import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { PrismaService } from './prisma/prisma.service'

@Controller('api')
export class AppController {
  constructor(
    private readonly app: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('/hello')
  getHello(): string {
    return this.app.getHello()
  }

  @Get('/prisma')
  async getPrisma(): Promise<any> {
    return this.prisma.user.findMany()
  }
}
