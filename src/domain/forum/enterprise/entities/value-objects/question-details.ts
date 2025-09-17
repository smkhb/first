import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'
import { Slug } from './slug'
import { Attachment } from '../attachment'

export interface QuestionWithDetailsProps {
  questionID: UniqueEntityID
  authorID: UniqueEntityID
  authorName: string
  title: string
  content: string
  slug: Slug
  attachments: Attachment[]
  bestAnswerID?: UniqueEntityID | null
  createdAt: Date
  updatedAt?: Date | null
}

export class QuestionWithDetails extends ValueObject<QuestionWithDetailsProps> {
  get questionID() {
    return this.props.questionID
  }

  get authorID() {
    return this.props.authorID
  }

  get authorName() {
    return this.props.authorName
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get slug() {
    return this.props.slug
  }

  get attachments() {
    return this.props.attachments
  }

  get bestAnswerID() {
    return this.props.bestAnswerID
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: QuestionWithDetailsProps) {
    return new QuestionWithDetails(props)
  }
}
