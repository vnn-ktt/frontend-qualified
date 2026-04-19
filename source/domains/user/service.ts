// User Domain - Service

import { UserProfile, UserId, Email, Username, Experience } from './'

export class UserService {
  createUser(email: Email, username: Username): UserProfile {
    return new UserProfile(
      UserId.generate(),
      email,
      username,
      new Experience(1, 0),
      '',
      '',
      new Date(),
      new Date()
    )
  }

  upgradeExperience(user: UserProfile, points: number): void {
    user.gainExperience(points)
  }

  isUserActive(user: UserProfile, minutesThreshold: number = 30): boolean {
    const now = new Date()
    const diff = (now.getTime() - user.lastActiveAt.getTime()) / (1000 * 60)
    return diff < minutesThreshold
  }

  rankUsers(users: UserProfile[]): Array<{ user: UserProfile; rank: number }> {
    return users
      .sort((a, b) => {
        if (b.experience.level !== a.experience.level) {
          return b.experience.level - a.experience.level
        }
        return b.experience.points - a.experience.points
      })
      .map((user, index) => ({ user, rank: index + 1 }))
  }
}
