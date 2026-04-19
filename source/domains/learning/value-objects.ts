// Learning Domain - Value Objects

export class ChallengeId {
  constructor(public readonly value: string) {}

  static generate(): ChallengeId {
    return new ChallengeId(`challenge_${Date.now()}_${Math.random()}`)
  }
}

export class Difficulty {
  private constructor(public readonly level: 'beginner' | 'intermediate' | 'advanced') {}

  static beginner(): Difficulty {
    return new Difficulty('beginner')
  }

  static intermediate(): Difficulty {
    return new Difficulty('intermediate')
  }

  static advanced(): Difficulty {
    return new Difficulty('advanced')
  }
}

export class Points {
  constructor(public readonly amount: number) {
    if (amount < 0) throw new Error('Points cannot be negative')
  }

  add(other: Points): Points {
    return new Points(this.amount + other.amount)
  }

  subtract(other: Points): Points {
    return new Points(Math.max(0, this.amount - other.amount))
  }
}
