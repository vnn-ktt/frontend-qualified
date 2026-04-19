import { SubmissionFeedback, CodeReview, AIFeedback } from './'

// Feedback Domain - Repository Interface

export interface FeedbackRepository {
  saveFeedback(feedback: SubmissionFeedback): Promise<void>
  getFeedbackBySubmission(submissionId: string): Promise<SubmissionFeedback | null>
  saveCodeReview(review: CodeReview): Promise<void>
  saveAIFeedback(feedback: AIFeedback): Promise<void>
  getApprovedSubmissions(): Promise<string[]>
}
