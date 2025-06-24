import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Attachment as PrismaAnswerAttachment } from '@prisma/client'
import { AnswerAttachment as DomainAnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class PrismaAnswerAttachmentMapper {
  static toDomain(raw: PrismaAnswerAttachment): DomainAnswerAttachment {
    if (!raw.answerId) {
      throw new Error(
        'Invalid attachment type: Answers Attachment must have an answerId',
      )
    }

    return DomainAnswerAttachment.create(
      {
        attachmentId: new UniqueEntityID(raw.id),
        answerId: new UniqueEntityID(raw.answerId),
      },
      new UniqueEntityID(raw.id),
    )
  }
}
