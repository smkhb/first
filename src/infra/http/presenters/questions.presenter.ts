import { Question as DomainQuestion } from '@/domain/forum/enterprise/entities/question'

export class QuestionsPresenter {
  static toHTTP(question: DomainQuestion) {
    return {
      id: question.id.toString(),
      title: question.title,
      slug: question.slug.value,
      bestAnswerId: question.bestAnswerId?.toString(),
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }
  }

  static toHTTPList(questions: any[]) {
    return questions.map(this.toHTTP)
  }
}
