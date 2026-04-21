import { Challenge, ChallengeId } from './'

// Learning Domain - Repository Interface

export interface ChallengeRepository {
  save(challenge: Challenge): Promise<void>
  getById(id: ChallengeId): Promise<Challenge | null>
  getAll(): Promise<Challenge[]>
  getByDifficulty(difficulty: string): Promise<Challenge[]>
  delete(id: ChallengeId): Promise<void>
}
