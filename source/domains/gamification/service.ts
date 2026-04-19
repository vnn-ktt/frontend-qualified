// Gamification Domain - Service

import { UserAchievements, Badge, Achievement } from './'

export class GamificationService {
  awardBadgeForMilestone(achievements: UserAchievements, points: number): Badge | null {
    const milestones: Array<{ threshold: number; badge: Badge }> = [
      {
        threshold: 1000,
        badge: Badge.createRare('First Steps', 'Earned 1000 points', 'pi-star'),
      },
      {
        threshold: 5000,
        badge: Badge.createEpic('Rising Star', 'Earned 5000 points', 'pi-crown'),
      },
      {
        threshold: 10000,
        badge: Badge.createLegendary('Legend', 'Earned 10000 points', 'pi-bolt'),
      },
    ]

    for (const { threshold, badge } of milestones) {
      if (achievements.totalPoints >= threshold && !achievements.badges.find((b) => b.id.value === badge.id.value)) {
        achievements.awardBadge(badge)
        return badge
      }
    }

    return null
  }

  updateRank(achievements: UserAchievements, newRank: number): void {
    achievements.rank = newRank
  }

  calculateLeaderboardPosition(topPoints: number, userPoints: number): number {
    return Math.floor((userPoints / topPoints) * 100)
  }

  checkAchievementProgress(achievements: UserAchievements, allAchievements: Achievement[]): Achievement[] {
    const newlyUnlocked: Achievement[] = []

    for (const achievement of allAchievements) {
      if (achievement.isUnlocked(achievements.totalPoints)) {
        if (!achievements.unlockedAchievements.find((a) => a.id === achievement.id)) {
          newlyUnlocked.push(achievement)
          achievements.unlockAchievement(achievement)
        }
      }
    }

    return newlyUnlocked
  }
}
