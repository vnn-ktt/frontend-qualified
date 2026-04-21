import { ChallengeId, Difficulty, Points } from './value-objects'

// Learning Domain - Entities

export interface Challenge {
  id: ChallengeId
  title: string
  description: string
  difficulty: Difficulty
  language: string
  code: string
  testCases: TestCase[]
  createdAt: Date
  updatedAt: Date
}

export interface TestCase {
  input: string
  expectedOutput: string
  description: string
}

export class Challenge implements Challenge {
  constructor(
    id: ChallengeId,
    title: string,
    description: string,
    difficulty: Difficulty,
    language: string,
    code: string,
    testCases: TestCase[],
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id
    this.title = title
    this.description = description
    this.difficulty = difficulty
    this.language = language
    this.code = code
    this.testCases = testCases
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  isValidDifficulty(): boolean {
    return ['beginner', 'intermediate', 'advanced'].includes(this.difficulty.level)
  }

  getRewardPoints(): Points {
    const basePoints = 100
    const multiplier = {
      beginner: 1,
      intermediate: 2,
      advanced: 3,
    }[this.difficulty.level]

    return new Points(basePoints * multiplier)
  }
}
