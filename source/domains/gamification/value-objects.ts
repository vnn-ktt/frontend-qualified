// Gamification Domain - Value Objects

export class BadgeId {
  constructor(public readonly value: string) {}

  static generate(): BadgeId {
    return new BadgeId(`badge_${Date.now()}_${Math.random()}`)
  }
}

export class Badge {
  constructor(
    public readonly id: BadgeId,
    public readonly name: string,
    public readonly description: string,
    public readonly icon: string,
    public readonly rarity: 'common' | 'rare' | 'epic' | 'legendary'
  ) {}

  static createCommon(name: string, description: string, icon: string): Badge {
    return new Badge(BadgeId.generate(), name, description, icon, 'common')
  }

  static createRare(name: string, description: string, icon: string): Badge {
    return new Badge(BadgeId.generate(), name, description, icon, 'rare')
  }

  static createEpic(name: string, description: string, icon: string): Badge {
    return new Badge(BadgeId.generate(), name, description, icon, 'epic')
  }

  static createLegendary(name: string, description: string, icon: string): Badge {
    return new Badge(BadgeId.generate(), name, description, icon, 'legendary')
  }
}

export class Achievement {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly requirement: number,
    public readonly reward: number
  ) {}

  isUnlocked(currentValue: number): boolean {
    return currentValue >= this.requirement
  }
}

export class LeaderboardEntry {
  constructor(
    public readonly rank: number,
    public readonly userId: string,
    public readonly username: string,
    public readonly level: number,
    public readonly totalPoints: number,
    public readonly badgeCount: number
  ) {}

  isTopRank(): boolean {
    return this.rank <= 10
  }
}
