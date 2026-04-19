import { UserAchievements, Badge, Achievement, LeaderboardEntry } from './'

// Gamification Domain - Repository Interface

export interface AchievementRepository {
  saveUserAchievements(achievements: UserAchievements): Promise<void>
  getUserAchievements(userId: string): Promise<UserAchievements | null>
  getLeaderboard(limit: number): Promise<LeaderboardEntry[]>
  getTopBadges(limit: number): Promise<Badge[]>
}
