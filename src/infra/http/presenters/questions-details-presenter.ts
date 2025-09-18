import { QuestionWithDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import { AttachmentPresenter } from './attachment-presenter'

export class QuestionsDetailsPresenter {
  static toHTTP(questionDetails: QuestionWithDetails) {
    return {
      questionID: questionDetails.questionID.toString(),
      authorID: questionDetails.authorID.toString(),
      authorName: questionDetails.authorName,
      content: questionDetails.content,
      title: questionDetails.title,
      slug: questionDetails.slug.value,
      attachments: questionDetails.attachments.map(AttachmentPresenter.toHTTP),
      bestAnswerId: questionDetails.bestAnswerID?.toString(),
      createdAt: questionDetails.createdAt,
      updatedAt: questionDetails.updatedAt,
    }
  }

  static toHTTPList(questions: any[]) {
    return questions.map(this.toHTTP)
  }
}
