import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Prisma, Attachment as PrismaQuestionAttachment } from '@prisma/client'
import { QuestionAttachment as DomainQuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class PrismaQuestionAttachmentMapper {
  static toDomain(raw: PrismaQuestionAttachment): DomainQuestionAttachment {
    if (!raw.questionId) {
      throw new Error(
        'Invalid attachment type: Questions Attachment must have an questionId',
      )
    }

    return DomainQuestionAttachment.create(
      {
        attachmentId: new UniqueEntityID(raw.id),
        questionId: new UniqueEntityID(raw.questionId),
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrismaUpdateMany(
    attachments: DomainQuestionAttachment[],
  ): Prisma.AttachmentUpdateManyArgs {
    const attachmentsIds = attachments.map((attachment) => {
      return attachment.attachmentId.toString()
    })

    return {
      where: { id: { in: attachmentsIds } },
      data: { questionId: attachments[0].questionId.toString() },
    }
  }
}
