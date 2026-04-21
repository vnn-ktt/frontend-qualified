// Feedback Domain - Service

import { SubmissionFeedback, CodeReview, AIFeedback } from './'

export class FeedbackService {
  evaluateSubmission(feedback: SubmissionFeedback): {
    isReady: boolean
    reason: string
  } {
    if (!feedback.aiFeedback) {
      return { isReady: false, reason: 'Waiting for AI feedback' }
    }

    if (feedback.aiFeedback.hasCriticalIssues()) {
      return { isReady: false, reason: 'Critical issues found - please address them' }
    }

    if (feedback.averageRating < 3) {
      return { isReady: false, reason: 'Code quality below acceptable threshold' }
    }

    return { isReady: true, reason: 'Ready for approval' }
  }

  prioritizeReviews(feedbacks: SubmissionFeedback[]): SubmissionFeedback[] {
    return feedbacks.sort((a, b) => {
      // Prioritize submissions with critical issues
      const aCritical = a.aiFeedback?.hasCriticalIssues() ? 1 : 0
      const bCritical = b.aiFeedback?.hasCriticalIssues() ? 1 : 0

      if (aCritical !== bCritical) return bCritical - aCritical

      // Then by lowest rating
      return a.averageRating - b.averageRating
    })
  }

  getSummary(feedback: SubmissionFeedback): string {
    const parts: string[] = []

    if (feedback.aiFeedback) {
      parts.push(`AI Score: ${feedback.aiFeedback.getOverallScore()}/100`)
    }

    if (feedback.codeReviews.length > 0) {
      parts.push(`Human Rating: ${feedback.averageRating}/5`)
      parts.push(`Comments: ${feedback.getTotalComments()}`)
    }

    return parts.join(' | ')
  }
}
