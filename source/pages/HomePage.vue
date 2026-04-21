<script setup lang="ts">
import { computed, watch } from "vue";
import { useRouter } from "vue-router";
import Background from "@/ui/animated/Background.vue";
import { useAuth } from "@/composables/useAuth";
import { RouteItems } from "@/router/types";
import { useQuestionsStore } from "@/stores/questions";
import { useUsersStore } from "@/stores/users";
import { EGrade, EQuestionType, type TQuestion } from "@/types/question";

const router = useRouter();
const { user, addXP, logout } = useAuth();
const { getQuestions, setQuestions } = useQuestionsStore();
const { users, setUsers } = useUsersStore();

const sampleQuestions: TQuestion[] = [
  {
    id: 1,
    type: EQuestionType.CLICK,
    grade: EGrade.JUNIOR,
    text: "Which array method returns a new array without mutating the original one?",
    hasOptions: true,
    options: [
      { id: 1, text: "map()", isCorrect: true },
      { id: 2, text: "splice()", isCorrect: false },
      { id: 3, text: "reverse()", isCorrect: false },
    ],
  },
  {
    id: 2,
    type: EQuestionType.ANSWER,
    grade: EGrade.MIDDLE,
    text: "Explain when you would use a computed property instead of a watcher in Vue.",
    hasOptions: false,
    answer: "Use computed for derived reactive state; use a watcher for side effects.",
  },
  {
    id: 3,
    type: EQuestionType.CLICK,
    grade: EGrade.SENIOR,
    text: "What is the main reason to split your frontend into domain modules?",
    hasOptions: true,
    options: [
      { id: 1, text: "To reduce cohesion", isCorrect: false },
      { id: 2, text: "To improve maintainability and boundaries", isCorrect: true },
      { id: 3, text: "To avoid routing", isCorrect: false },
    ],
  },
];

watch(
  user,
  (currentUser) => {
    if (!currentUser) return;

    setUsers([currentUser]);

    if (!getQuestions.value.length) {
      setQuestions(sampleQuestions);
    }
  },
  { immediate: true }
);

const currentUser = computed(() => user.value);
const featuredQuestions = computed(() => getQuestions.value.slice(0, 3));
const completionRate = computed(() => {
  const xp = currentUser.value?.xp ?? 0;
  return Math.min(100, Math.round((xp / 1000) * 100));
});

const statCards = computed(() => {
  const xp = currentUser.value?.xp ?? 0;
  const level = currentUser.value?.level ?? 1;

  return [
    {
      label: "Current level",
      value: `L${level}`,
      hint: "Based on accumulated XP",
    },
    {
      label: "XP progress",
      value: `${xp} XP`,
      hint: `${completionRate.value}% to the next milestone`,
    },
    {
      label: "Questions ready",
      value: `${getQuestions.value.length}`,
      hint: "Curated interview drills",
    },
    {
      label: "Active learners",
      value: `${users.value.length}`,
      hint: "Persisted in Nano Stores",
    },
  ];
});

const handleQuickWin = () => {
  addXP(120);

  if (user.value) {
    setUsers([{ ...user.value }]);
  }
};

const handleLogout = () => {
  logout();
  router.push(RouteItems.landing);
};
</script>

<template>
  <section class="dashboard-page">
    <Background />

    <div class="dashboard-page__content">
      <div class="dashboard-page__welcome">
        <div>
          <p class="dashboard-page__eyebrow">Authenticated workspace</p>
          <h2 class="dashboard-page__title">
            Welcome back, {{ currentUser?.name || "Learner" }}
          </h2>
          <p class="dashboard-page__subtitle">
            Your dashboard is now connected to auth state and Nano Stores. This
            is the central place to continue your mobile-first interview prep.
          </p>
        </div>

        <div class="dashboard-page__actions">
          <button class="dashboard-page__primary-btn" @click="handleQuickWin">
            Add 120 XP
          </button>
          <button class="dashboard-page__ghost-btn" @click="handleLogout">
            Sign out
          </button>
        </div>
      </div>

      <div class="dashboard-page__stats">
        <article
          v-for="card in statCards"
          :key="card.label"
          class="dashboard-page__stat-card"
        >
          <p class="dashboard-page__stat-label">{{ card.label }}</p>
          <h3 class="dashboard-page__stat-value">{{ card.value }}</h3>
          <p class="dashboard-page__stat-hint">{{ card.hint }}</p>
        </article>
      </div>

      <div class="dashboard-page__grid">
        <article class="dashboard-page__panel dashboard-page__panel--profile">
          <div class="dashboard-page__panel-header">
            <div>
              <p class="dashboard-page__panel-eyebrow">Profile</p>
              <h3 class="dashboard-page__panel-title">Learner snapshot</h3>
            </div>
          </div>

          <div v-if="currentUser" class="dashboard-page__profile">
            <img
              v-if="currentUser.avatar"
              :src="currentUser.avatar"
              :alt="currentUser.name"
              class="dashboard-page__profile-avatar"
            />

            <div class="dashboard-page__profile-content">
              <h4>{{ currentUser.name }}</h4>
              <p>{{ currentUser.email }}</p>

              <div class="dashboard-page__progress">
                <div class="dashboard-page__progress-bar">
                  <span
                    class="dashboard-page__progress-fill"
                    :style="{ width: `${completionRate}%` }"
                  />
                </div>
                <small>{{ completionRate }}% towards the next level</small>
              </div>
            </div>
          </div>
        </article>

        <article class="dashboard-page__panel dashboard-page__panel--questions">
          <div class="dashboard-page__panel-header">
            <div>
              <p class="dashboard-page__panel-eyebrow">Practice queue</p>
              <h3 class="dashboard-page__panel-title">Featured questions</h3>
            </div>
          </div>

          <div class="dashboard-page__question-list">
            <article
              v-for="question in featuredQuestions"
              :key="question.id"
              class="dashboard-page__question-card"
            >
              <div class="dashboard-page__question-meta">
                <span class="dashboard-page__tag">{{ question.grade }}</span>
                <span class="dashboard-page__tag dashboard-page__tag--secondary">
                  {{ question.type }}
                </span>
              </div>

              <h4>{{ question.text }}</h4>

              <p v-if="question.hasOptions && question.type === EQuestionType.CLICK">
                {{ question.options.length }} answer options ready for review.
              </p>
              <p v-else>
                Open-ended answer challenge for deeper interview practice.
              </p>
            </article>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.dashboard-page
  position: relative
  min-height: 100%
  overflow: hidden

.dashboard-page__content
  position: relative
  z-index: 1
  display: flex
  flex-direction: column
  gap: 1rem

.dashboard-page__welcome,
.dashboard-page__panel,
.dashboard-page__stat-card
  border: 1px solid rgba(var(--cyber-glow-rgb), 0.14)
  background: rgba(var(--color-dark-rgb), 0.5)
  backdrop-filter: blur(10px)
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.18)

.dashboard-page__welcome
  display: grid
  gap: 1rem
  padding: 1.1rem
  border-radius: 1.2rem

.dashboard-page__eyebrow,
.dashboard-page__panel-eyebrow
  margin: 0 0 0.35rem
  font-size: 0.75rem
  text-transform: uppercase
  letter-spacing: 0.12em
  color: var(--color-text-secondary)

.dashboard-page__title
  margin: 0
  font-size: clamp(1.6rem, 6vw, 2.4rem)
  line-height: 1.08

.dashboard-page__subtitle
  margin: 0.65rem 0 0
  max-width: 40rem
  color: var(--color-text-secondary)
  line-height: 1.6

.dashboard-page__actions
  display: flex
  flex-direction: column
  gap: 0.75rem

.dashboard-page__primary-btn,
.dashboard-page__ghost-btn
  min-height: 3rem
  border-radius: 0.95rem
  font-weight: 700
  cursor: pointer
  transition: all 0.2s ease

.dashboard-page__primary-btn
  border: none
  color: white
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary))

  &:hover
    transform: translateY(-2px)
    filter: brightness(1.05)

.dashboard-page__ghost-btn
  border: 1px solid rgba(var(--cyber-glow-rgb), 0.18)
  color: var(--color-text-primary)
  background: rgba(var(--cyber-glow-rgb), 0.06)

  &:hover
    background: rgba(var(--cyber-glow-rgb), 0.12)

.dashboard-page__stats
  display: grid
  grid-template-columns: 1fr
  gap: 0.85rem

.dashboard-page__stat-card
  padding: 1rem
  border-radius: 1rem

.dashboard-page__stat-label
  margin: 0
  font-size: 0.8rem
  color: var(--color-text-secondary)
  text-transform: uppercase
  letter-spacing: 0.08em

.dashboard-page__stat-value
  margin: 0.45rem 0 0.35rem
  font-size: 1.7rem

.dashboard-page__stat-hint
  margin: 0
  color: var(--color-text-secondary)
  line-height: 1.45

.dashboard-page__grid
  display: grid
  grid-template-columns: 1fr
  gap: 1rem

.dashboard-page__panel
  padding: 1.1rem
  border-radius: 1.2rem

.dashboard-page__panel-header
  margin-bottom: 1rem

.dashboard-page__panel-title
  margin: 0
  font-size: 1.2rem

.dashboard-page__profile
  display: flex
  flex-direction: column
  gap: 1rem

.dashboard-page__profile-avatar
  width: 5rem
  height: 5rem
  border-radius: 1.2rem
  object-fit: cover
  border: 1px solid rgba(var(--cyber-glow-rgb), 0.2)
  background: rgba(var(--color-dark-rgb), 0.4)

.dashboard-page__profile-content
  display: flex
  flex-direction: column
  gap: 0.45rem

  h4
    margin: 0
    font-size: 1.1rem

  p
    margin: 0
    color: var(--color-text-secondary)

.dashboard-page__progress
  display: flex
  flex-direction: column
  gap: 0.5rem
  margin-top: 0.6rem

  small
    color: var(--color-text-secondary)

.dashboard-page__progress-bar
  width: 100%
  height: 0.7rem
  border-radius: 999px
  overflow: hidden
  background: rgba(var(--cyber-glow-rgb), 0.08)

.dashboard-page__progress-fill
  display: block
  height: 100%
  border-radius: inherit
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary))

.dashboard-page__question-list
  display: flex
  flex-direction: column
  gap: 0.85rem

.dashboard-page__question-card
  padding: 0.95rem
  border-radius: 1rem
  border: 1px solid rgba(var(--cyber-glow-rgb), 0.14)
  background: rgba(var(--cyber-glow-rgb), 0.04)

  h4
    margin: 0 0 0.45rem
    line-height: 1.45

  p
    margin: 0
    color: var(--color-text-secondary)
    line-height: 1.5

.dashboard-page__question-meta
  display: flex
  flex-wrap: wrap
  gap: 0.45rem
  margin-bottom: 0.7rem

.dashboard-page__tag
  display: inline-flex
  align-items: center
  padding: 0.35rem 0.6rem
  border-radius: 999px
  font-size: 0.72rem
  font-weight: 700
  letter-spacing: 0.06em
  background: rgba(var(--color-primary-rgb), 0.18)
  color: var(--color-text-primary)

.dashboard-page__tag--secondary
  background: rgba(var(--cyber-glow-rgb), 0.12)

@media (min-width: 700px)
  .dashboard-page__welcome
    grid-template-columns: 1.6fr 0.8fr
    align-items: end

  .dashboard-page__actions
    align-self: stretch
    justify-content: flex-end

  .dashboard-page__stats
    grid-template-columns: repeat(2, minmax(0, 1fr))

@media (min-width: 960px)
  .dashboard-page__grid
    grid-template-columns: 0.9fr 1.1fr

  .dashboard-page__profile
    flex-direction: row
    align-items: center

  .dashboard-page__stats
    grid-template-columns: repeat(4, minmax(0, 1fr))
</style>
