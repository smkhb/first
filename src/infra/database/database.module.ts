import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaQuestionsRepo } from './prisma/repos/prisma-questions-repo'
import { PrismaQuestionAttachmentsRepo } from './prisma/repos/prisma-question-attachments-repo'
import { PrismaQuestionCommentsRepo } from './prisma/repos/prisma-question-comments-repo'
import { PrismaAnswersRepo } from './prisma/repos/prisma-answers-repo'
import { PrismaAnswerCommentsRepo } from './prisma/repos/prisma-answer-comments-repo'
import { PrismaAnswerAttachmentsRepo } from './prisma/repos/prisma-answer-attachments-repo'

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    PrismaQuestionsRepo,
    PrismaQuestionCommentsRepo,
    PrismaQuestionAttachmentsRepo,
    PrismaAnswersRepo,
    PrismaAnswerCommentsRepo,
    PrismaAnswerAttachmentsRepo,
  ],
  exports: [
    PrismaService,
    PrismaQuestionsRepo,
    PrismaQuestionCommentsRepo,
    PrismaQuestionAttachmentsRepo,
    PrismaAnswersRepo,
    PrismaAnswerCommentsRepo,
    PrismaAnswerAttachmentsRepo,
  ],
})
export class DatabaseModule {}
