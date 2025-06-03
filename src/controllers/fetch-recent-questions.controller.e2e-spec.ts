/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Fetch recent questions (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /questions', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Test Account',
        email: 'test@example.com',
        password: await hash('password123', 8),
      },
    })
    const accessToken = jwt.sign({ sub: user.id })

    await prisma.question.createMany({
      data: [
        {
          title: 'Test Question 1',
          slug: 'test-question-1',
          content: 'This is a test question 1.',
          authorId: user.id,
        },
        {
          title: 'Test Question 2',
          slug: 'test-question-2',
          content: 'This is a test question 2.',
          authorId: user.id,
        },
        {
          title: 'Test Question 3',
          slug: 'test-question-3',
          content: 'This is a test question 3.',
          authorId: user.id,
        },
      ],
    })

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({ title: 'Test Question 1' }),
        expect.objectContaining({ title: 'Test Question 2' }),
        expect.objectContaining({ title: 'Test Question 3' }),
      ],
    })
  })
})
