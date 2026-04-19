// User Domain - Value Objects

export class UserId {
  constructor(public readonly value: string) {}

  static generate(): UserId {
    return new UserId(`user_${Date.now()}_${Math.random()}`)
  }
}

export class Email {
  private constructor(public readonly value: string) {}

  static create(email: string): Email {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format')
    }
    return new Email(email.toLowerCase())
  }

  equals(other: Email): boolean {
    return this.value === other.value
  }
}

export class Username {
  private constructor(public readonly value: string) {}

  static create(username: string): Username {
    if (username.length < 3 || username.length > 20) {
      throw new Error('Username must be between 3 and 20 characters')
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      throw new Error('Username can only contain letters, numbers, underscores, and dashes')
    }
    return new Username(username)
  }
}

export class Experience {
  constructor(public readonly level: number = 1, public readonly points: number = 0) {
    if (level < 1) throw new Error('Level must be at least 1')
    if (points < 0) throw new Error('Points cannot be negative')
  }

  addPoints(amount: number): Experience {
    const pointsPerLevel = 1000
    const totalPoints = this.points + amount
    const newLevel = Math.floor(totalPoints / pointsPerLevel) + 1
    const remainingPoints = totalPoints % pointsPerLevel

    return new Experience(newLevel, remainingPoints)
  }

  nextLevelProgress(): number {
    const pointsPerLevel = 1000
    return (this.points / pointsPerLevel) * 100
  }
}
