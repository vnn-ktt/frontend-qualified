import { Badge, Achievement, LeaderboardEntry, BadgeId } from './value-objects'

// Gamification Domain - Entities

export interface UserAchievements {
  userId: string
  badges: Badge[]
  unlockedAchievements: Achievement[]
  totalPoints: number
  rank: number
}

export class UserAchievements implements UserAchievements {
  constructor(
    userId: string,
    badges: Badge[] = [],
    unlockedAchievements: Achievement[] = [],
    totalPoints: number = 0,
    rank: number = 0
  ) {
    this.userId = userId
    this.badges = badges
    this.unlockedAchievements = unlockedAchievements
    this.totalPoints = totalPoints
    this.rank = rank
  }

  awardBadge(badge: Badge): void {
    if (!this.badges.find((b) => b.id.value === badge.id.value)) {
      this.badges.push(badge)
    }
  }

  addPoints(points: number): void {
    this.totalPoints += points
  }

  unlockAchievement(achievement: Achievement): void {
    if (!this.unlockedAchievements.find((a) => a.id === achievement.id)) {
      this.unlockedAchievements.push(achievement)
    }
  }

  hasNewBadges(): boolean {
    return this.badges.length > 0
  }
}
