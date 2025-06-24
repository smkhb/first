import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer as PrismaAnswer, Prisma } from '@prisma/client'
import { Answer as DomainAnswer } from '@/domain/forum/enterprise/entities/answer'

export class PrismaAnswerMapper {
  static toDomain(raw: PrismaAnswer): DomainAnswer {
    return DomainAnswer.create(
      {
        content: raw.content,
        questionId: new UniqueEntityID(raw.questionId),
        authorId: new UniqueEntityID(raw.authorId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(answer: DomainAnswer): Prisma.AnswerUncheckedCreateInput {
    return {
      id: answer.id.toString(),
      authorId: answer.authorId.toString(),
      questionId: answer.questionId.toString(),
      content: answer.content,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    }
  }
}
