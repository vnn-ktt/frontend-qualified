import { CodeReview, AIFeedback, FeedbackId } from './value-objects'

// Feedback Domain - Entities

export interface SubmissionFeedback {
  submissionId: string
  codeReviews: CodeReview[]
  aiFeedback: AIFeedback | null
  averageRating: number
  isApproved: boolean
}

export class SubmissionFeedback implements SubmissionFeedback {
  constructor(
    submissionId: string,
    codeReviews: CodeReview[] = [],
    aiFeedback: AIFeedback | null = null,
    isApproved: boolean = false
  ) {
    this.submissionId = submissionId
    this.codeReviews = codeReviews
    this.aiFeedback = aiFeedback
    this.isApproved = isApproved
    this.averageRating = this.calculateAverageRating()
  }

  addCodeReview(review: CodeReview): void {
    this.codeReviews.push(review)
    this.averageRating = this.calculateAverageRating()
  }

  setAIFeedback(feedback: AIFeedback): void {
    this.aiFeedback = feedback
  }

  approve(): void {
    this.isApproved = true
  }

  getTotalComments(): number {
    return this.codeReviews.reduce((total, review) => total + review.comments.length, 0)
  }

  private calculateAverageRating(): number {
    if (this.codeReviews.length === 0) return 0
    const sum = this.codeReviews.reduce((total, review) => total + review.rating, 0)
    return Math.round(sum / this.codeReviews.length)
  }
}
