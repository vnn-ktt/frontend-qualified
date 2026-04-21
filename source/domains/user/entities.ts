import { UserId, Email, Username, Experience } from './value-objects'

// User Domain - Entities

export interface UserProfile {
  id: UserId
  email: Email
  username: Username
  experience: Experience
  bio?: string
  avatar?: string
  joinedAt: Date
  lastActiveAt: Date
}

export class UserProfile implements UserProfile {
  constructor(
    id: UserId,
    email: Email,
    username: Username,
    experience: Experience,
    bio: string = '',
    avatar: string = '',
    joinedAt: Date = new Date(),
    lastActiveAt: Date = new Date()
  ) {
    this.id = id
    this.email = email
    this.username = username
    this.experience = experience
    this.bio = bio
    this.avatar = avatar
    this.joinedAt = joinedAt
    this.lastActiveAt = lastActiveAt
  }

  updateActivity(): void {
    this.lastActiveAt = new Date()
  }

  gainExperience(points: number): void {
    this.experience = this.experience.addPoints(points)
  }

  updateBio(newBio: string): void {
    if (newBio.length > 500) {
      throw new Error('Bio cannot exceed 500 characters')
    }
    this.bio = newBio
  }
}
