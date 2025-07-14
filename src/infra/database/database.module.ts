import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaQuestionsRepo } from './prisma/repos/prisma-questions-repo'
import { PrismaQuestionAttachmentsRepo } from './prisma/repos/prisma-question-attachments-repo'
import { PrismaQuestionCommentsRepo } from './prisma/repos/prisma-question-comments-repo'
import { PrismaAnswersRepo } from './prisma/repos/prisma-answers-repo'
import { PrismaAnswerCommentsRepo } from './prisma/repos/prisma-answer-comments-repo'
import { PrismaAnswerAttachmentsRepo } from './prisma/repos/prisma-answer-attachments-repo'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { PrismaStudentsRepo } from './prisma/repos/prisma-students-repo'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepo,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepo,
    },
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepo,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepo,
    },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepo,
    },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepo,
    },
    {
      provide: AnswersRepository,
      useClass: PrismaAnswersRepo,
    },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepo,
    },
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepo,
    },
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    StudentsRepository,
    QuestionCommentsRepository,
    QuestionAttachmentsRepository,
    AnswersRepository,
    AnswerCommentsRepository,
    AnswerAttachmentsRepository,
  ],
})
export class DatabaseModule {}
