import { ValueObject } from '@/core/entities/value-object'

export interface CommentWithAuthorProps {
  contentID: string
  content: string
  authorID: string
  authorName: string
  createdAt: Date
  updatedAt?: Date | null
}

export class CommentWithAuthor extends ValueObject<CommentWithAuthorProps> {
  get commentID() {
    return this.props.contentID
  }

  get content() {
    return this.props.content
  }

  get authorID() {
    return this.props.authorID
  }

  get authorName() {
    return this.props.authorName
  }

  get createdAt() {
    return this.props.createdAt
  }
  
  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: CommentWithAuthorProps) {
    return new CommentWithAuthor(props)
  }
}
