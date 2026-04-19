import { UserProfile, UserId, Email } from './'

// User Domain - Repository Interface

export interface UserRepository {
  save(user: UserProfile): Promise<void>
  getById(id: UserId): Promise<UserProfile | null>
  getByEmail(email: Email): Promise<UserProfile | null>
  getByUsername(username: string): Promise<UserProfile | null>
  delete(id: UserId): Promise<void>
  getAllUsers(): Promise<UserProfile[]>
}
