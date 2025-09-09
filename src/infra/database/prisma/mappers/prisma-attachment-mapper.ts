import { Prisma, Attachment as PrismaAttachment } from '@prisma/client'
import { Attachment as DomainAttachment } from '@/domain/forum/enterprise/entities/attachment'

export class PrismaAttachmentMapper {
  static toPrisma(
    attachment: DomainAttachment,
  ): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: attachment.id.toString(),
      title: attachment.title,
      url: attachment.url,
    }
  }
}
