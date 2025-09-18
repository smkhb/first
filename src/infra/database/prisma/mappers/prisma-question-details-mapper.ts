import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionWithDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import {
  Question as PrismaQuestion,
  User as PrismaUser,
  Attachment as PrismaAttachment,
} from '@prisma/client'
import { PrismaAttachmentMapper } from './prisma-attachment-mapper'

type PrismaQuestionDetails = PrismaQuestion & {
  author: PrismaUser
  attachments: PrismaAttachment[]
}

export class PrismaQuestionDetailsMapper {
  static toDomain(raw: PrismaQuestionDetails): QuestionWithDetails {
    return QuestionWithDetails.create({
      questionID: new UniqueEntityID(raw.id),
      authorID: new UniqueEntityID(raw.authorId),
      authorName: raw.author.name,
      title: raw.title,
      content: raw.content,
      attachments: raw.attachments.map(PrismaAttachmentMapper.toDomain),
      bestAnswerID: raw.bestAnswerId
        ? new UniqueEntityID(raw.bestAnswerId)
        : null,
      slug: Slug.create(raw.slug),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
}
