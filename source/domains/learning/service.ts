// Learning Domain - Service

import { Challenge, ChallengeId, Difficulty, Points, TestCase } from './'

export class ChallengeService {
  createChallenge(
    title: string,
    description: string,
    difficulty: Difficulty,
    language: string,
    code: string,
    testCases: TestCase[]
  ): Challenge {
    const challenge = new Challenge(
      ChallengeId.generate(),
      title,
      description,
      difficulty,
      language,
      code,
      testCases,
      new Date(),
      new Date()
    )

    if (!challenge.isValidDifficulty()) {
      throw new Error('Invalid difficulty level')
    }

    return challenge
  }

  calculateRewards(challenge: Challenge): Points {
    return challenge.getRewardPoints()
  }

  filterChallengesByDifficulty(challenges: Challenge[], difficulty: Difficulty): Challenge[] {
    return challenges.filter((c) => c.difficulty.level === difficulty.level)
  }
}
