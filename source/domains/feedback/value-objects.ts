// Feedback Domain - Value Objects

export class FeedbackId {
  constructor(public readonly value: string) {}

  static generate(): FeedbackId {
    return new FeedbackId(`feedback_${Date.now()}_${Math.random()}`)
  }
}

export class CodeReview {
  constructor(
    public readonly id: FeedbackId,
    public readonly submissionId: string,
    public readonly code: string,
    public readonly comments: ReviewComment[],
    public readonly rating: number,
    public readonly createdAt: Date
  ) {
    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5')
    }
  }

  addComment(line: number, text: string): ReviewComment {
    const comment = new ReviewComment(line, text, new Date())
    this.comments.push(comment)
    return comment
  }

  getMeaningfulComments(): ReviewComment[] {
    return this.comments.filter((c) => c.text.length > 0)
  }
}

export class ReviewComment {
  constructor(
    public readonly line: number,
    public readonly text: string,
    public readonly createdAt: Date
  ) {}

  isConstructive(): boolean {
    const constructiveKeywords = ['improve', 'consider', 'refactor', 'optimize', 'better', 'good', 'great']
    return constructiveKeywords.some((keyword) => this.text.toLowerCase().includes(keyword))
  }
}

export class AIFeedback {
  constructor(
    public readonly id: FeedbackId,
    public readonly submissionId: string,
    public readonly analysis: string,
    public readonly suggestions: string[],
    public readonly complexity: string,
    public readonly performanceScore: number,
    public readonly readabilityScore: number,
    public readonly createdAt: Date
  ) {}

  getOverallScore(): number {
    return Math.round((this.performanceScore + this.readabilityScore) / 2)
  }

  hasCriticalIssues(): boolean {
    return this.performanceScore < 40 || this.readabilityScore < 40
  }
}
