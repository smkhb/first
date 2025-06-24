import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Comment as PrismaAnswerComment, Prisma } from '@prisma/client'
import { AnswerComment as DomainAnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class PrismaAnswerCommentMapper {
  static toDomain(raw: PrismaAnswerComment): DomainAnswerComment {
    if (!raw.answerId) {
      throw new Error(
        'Invalid comment type: Answers Comment must have an answerId',
      )
    }

    return DomainAnswerComment.create(
      {
        authorId: new UniqueEntityID(raw.authorId),
        content: raw.content,
        answerId: new UniqueEntityID(raw.answerId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    answerComment: DomainAnswerComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
      answerId: answerComment.answerId.toString(),
      content: answerComment.content,
      createdAt: answerComment.createdAt,
      updatedAt: answerComment.updatedAt,
    }
  }
}
