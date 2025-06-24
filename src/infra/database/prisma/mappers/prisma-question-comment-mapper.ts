import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Comment as PrismaQuestionComment, Prisma } from '@prisma/client'
import { QuestionComment as DomainQuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class PrismaQuestionCommentMapper {
  static toDomain(raw: PrismaQuestionComment): DomainQuestionComment {
    if (!raw.questionId) {
      throw new Error(
        'Invalid comment type: Questions Comment must have an questionId',
      )
    }

    return DomainQuestionComment.create(
      {
        authorId: new UniqueEntityID(raw.authorId),
        content: raw.content,
        questionId: new UniqueEntityID(raw.questionId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    questionComment: DomainQuestionComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
      questionId: questionComment.questionId.toString(),
      content: questionComment.content,
      createdAt: questionComment.createdAt,
      updatedAt: questionComment.updatedAt,
    }
  }
}
