# Domain Driven Design (DDD) Architecture

This project uses **Domain Driven Design** principles to organize business logic around distinct domains.

## Project Structure

```
source/
├── domains/                 # Core business layers
│   ├── learning/           # Learning challenges and rewards
│   │   ├── value-objects.ts
│   │   ├── entities.ts
│   │   ├── repository.ts
│   │   ├── service.ts
│   │   └── index.ts
│   ├── user/               # User profiles and experience
│   │   ├── value-objects.ts
│   │   ├── entities.ts
│   │   ├── repository.ts
│   │   ├── service.ts
│   │   └── index.ts
│   ├── gamification/       # Badges, achievements, leaderboards
│   │   ├── value-objects.ts
│   │   ├── entities.ts
│   │   ├── repository.ts
│   │   ├── service.ts
│   │   └── index.ts
│   ├── feedback/           # Code reviews and AI feedback
│   │   ├── value-objects.ts
│   │   ├── entities.ts
│   │   ├── repository.ts
│   │   ├── service.ts
│   │   └── index.ts
│   └── index.ts
├── ui/                     # Presentation layer (Vue components)
├── pages/                  # Page components
├── layouts/                # Layout components
├── stores/                 # State management (Pinia)
├── routes/                 # Router configuration
└── main.ts                 # Entry point
```

## Domain Layers

### 1. **Value Objects** (`value-objects.ts`)

Immutable, domain-specific objects that represent concepts in your business domain.

**Examples:**

- `UserId`, `Email`, `Username` (User domain)
- `ChallengeId`, `Difficulty`, `Points` (Learning domain)
- `Badge`, `Achievement` (Gamification domain)
- `CodeReview`, `AIFeedback` (Feedback domain)

### 2. **Entities** (`entities.ts`)

Objects with identity that can change state over time. They represent core business concepts.

**Examples:**

- `UserProfile` - User with experience, bio, avatar
- `Challenge` - Learning challenge with difficulty and test cases
- `UserAchievements` - User's badges and unlocked achievements
- `SubmissionFeedback` - Feedback for code submissions

### 3. **Services** (`service.ts`)

Business logic that doesn't belong to any single entity. Orchestrates operations across entities and value objects.

**Examples:**

- `UserService` - Create users, upgrade experience, rank users
- `ChallengeService` - Create challenges, filter by difficulty
- `GamificationService` - Award badges, update rankings
- `FeedbackService` - Evaluate submissions, prioritize reviews

### 4. **Repositories** (`repository.ts`)

Interfaces that define how domain objects are persisted and retrieved. Abstracts away data access concerns.

**Examples:**

- `UserRepository` - Save/get user profiles
- `ChallengeRepository` - Save/get challenges
- `AchievementRepository` - Get leaderboards, user achievements
- `FeedbackRepository` - Save and retrieve feedback

## Domain Interactions

### Unified Domain Example: User Completes a Challenge

```typescript
// 1. User Domain: Get user and update experience
const user = userRepository.getById(userId);
userService.upgradeExperience(user, points);
await userRepository.save(user);

// 2. Gamification Domain: Check for new badges
const achievements = achievementRepository.getUserAchievements(userId);
const newBadge = gamificationService.awardBadgeForMilestone(
  achievements,
  user.experience.points,
);
if (newBadge) await achievementRepository.saveUserAchievements(achievements);

// 3. Learning Domain: Verify challenge completion
const challenge = challengeRepository.getById(challengeId);
const rewards = challengeService.calculateRewards(challenge);

// 4. Feedback Domain: Get submission feedback
const feedback = feedbackRepository.getFeedbackBySubmission(submissionId);
const evaluation = feedbackService.evaluateSubmission(feedback);
```

## Key Principles

✅ **Isolation**: Each domain is independent and can be tested separately
✅ **Reusability**: Domains can be used by different features
✅ **Maintainability**: Clear separation of concerns
✅ **Type Safety**: Strong typing with TypeScript
✅ **Testability**: Business logic is pure and deterministic

## How to Use

1. **Import domains** in your components:

   ```typescript
   import { UserService, Email, Username } from "@/domains";
   ```

2. **Use repositories** in your stores:

   ```typescript
   const user = await userRepository.getById(userId);
   ```

3. **Call services** for complex operations:
   ```typescript
   gamificationService.checkAchievementProgress(achievements, allAchievements);
   ```

## Next Steps

- Implement repositories (currently interfaces, need backend integration)
- Create state management stores using Pinia
- Build UI components that consume these domains
- Add more domains as needed (e.g., Notifications, Analytics)
