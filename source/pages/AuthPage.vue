<template>
  <div class="login-page">
    <!-- Background effects -->
    <div class="cyber-grid"></div>
    <div class="scan-line"></div>
    <div class="floating-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>

    <!-- Main container -->
    <div class="login-container">
      <!-- Brand header -->
      <header class="login-header">
        <CyberButton
          class="back-btn"
          type="outline"
          @click="goHome"
          size="small"
        >
          <i class="pi pi-arrow-left"></i>
          Back to Home
        </CyberButton>

        <div class="brand">
          <h1 class="brand-title">CODE<span class="accent">FORGE</span></h1>
          <p class="brand-subtitle">Master JavaScript & TypeScript</p>
        </div>
      </header>

      <!-- Hero section -->
      <main class="login-hero">
        <!-- Left content -->
        <div class="hero-left">
          <div class="cyber-card hero-card">
            <h2 class="hero-title">Unlock Your<br><span class="accent">Coding Potential</span></h2>

            <div class="features-list">
              <div class="feature-item">
                <i class="pi pi-star feature-icon"></i>
                <div class="feature-text">
                  <h4>Interactive Challenges</h4>
                  <p>Learn by solving real coding problems</p>
                </div>
              </div>

              <div class="feature-item">
                <i class="pi pi-award feature-icon"></i>
                <div class="feature-text">
                  <h4>Gamified Learning</h4>
                  <p>Earn XP, level up, and track progress</p>
                </div>
              </div>

              <div class="feature-item">
                <i class="pi pi-server feature-icon"></i>
                <div class="feature-text">
                  <h4>AI Mentor</h4>
                  <p>Get personalized guidance and feedback</p>
                </div>
              </div>
            </div>

            <div class="stats">
              <div class="stat">
                <div class="stat-value">10K+</div>
                <div class="stat-label">Developers</div>
              </div>
              <div class="stat">
                <div class="stat-value">100+</div>
                <div class="stat-label">Challenges</div>
              </div>
              <div class="stat">
                <div class="stat-value">95%</div>
                <div class="stat-label">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right content - Auth forms -->
        <div class="hero-right">
          <div class="cyber-card auth-card">
            <div class="auth-card-header">
              <h3>Start Your Journey</h3>
              <p>Join thousands of developers mastering modern web development</p>
            </div>

            <!-- Auth provider component -->
            <AuthProvider @auth-change="handleAuthChange" />

            <!-- Quick login options -->
            <div class="quick-options">
              <div class="divider">
                <span>Or try demo account</span>
              </div>

              <CyberButton
                type="secondary"
                @click="useDemoAccount"
                size="large"
                full-width
              >
                <i class="pi pi-user"></i>
                Try Demo Account
              </CyberButton>
            </div>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer class="login-footer">
        <div class="footer-links">
          <a href="#" class="footer-link">Privacy Policy</a>
          <a href="#" class="footer-link">Terms of Service</a>
          <a href="#" class="footer-link">Contact Us</a>
          <a href="#" class="footer-link">Help Center</a>
        </div>
        <p class="copyright">© 2024 CodeForge. All code rights reserved.</p>
      </footer>
    </div>

    <!-- Notification -->
    <transition name="slide-up">
      <div v-if="showWelcome" class="welcome-notification">
        <div class="notification-content">
          <i class="pi pi-check-circle notification-icon"></i>
          <div>
            <h4>Welcome, {{ userName }}!</h4>
            <p>Redirecting to your dashboard...</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import AuthProvider from '@/ui/providers/AuthProvider.vue'
import CyberButton from '@/ui/buttons/Button.vue'

const router = useRouter()
const toast = useToast()
const showWelcome = ref(false)
const userName = ref('')

const goHome = () => {
  router.push('/')
}

const handleAuthChange = (event: { type: string; user: any }) => {
  if (event.type === 'login' || event.type === 'register') {
    userName.value = event.user.name
    showWelcome.value = true

    // Редирект на главную через 2 секунды
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }
}

const useDemoAccount = () => {
  const demoUser = {
    id: 'demo',
    name: 'Demo User',
    email: 'demo@codeforge.com',
    level: 3,
    xp: 750,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo'
  }

  toast.add({ severity: 'success', summary: 'Success', detail: 'Demo account activated!', life: 3000 })
  handleAuthChange({ type: 'login', user: demoUser })
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: var(--cyber-bg-primary);
  position: relative;
  overflow: hidden;

  .cyber-grid {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
      linear-gradient(rgba(0, 102, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 102, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    z-index: 1;
  }

  .scan-line {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg,
      transparent,
      rgba(0, 212, 255, 0.8),
      transparent
    );
    filter: blur(1px);
    animation: scan 4s linear infinite;
    z-index: 2;
  }

  .floating-shapes {
    position: fixed;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;

    .shape {
      position: absolute;
      border: 1px solid rgba(0, 212, 255, 0.1);
      border-radius: 50%;
      animation: float 20s infinite linear;

      &.shape-1 {
        top: 10%;
        left: 10%;
        width: 100px;
        height: 100px;
      }

      &.shape-2 {
        top: 60%;
        right: 15%;
        width: 150px;
        height: 150px;
        animation-delay: -5s;
      }

      &.shape-3 {
        bottom: 20%;
        left: 20%;
        width: 80px;
        height: 80px;
        animation-delay: -10s;
      }
    }
  }
}

.login-container {
  position: relative;
  z-index: 3;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.login-header {
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .back-btn {
    i {
      margin-right: 8px;
    }
  }

  .brand {
    text-align: center;
    flex: 1;

    .brand-icon {
      width: 40px;
      height: 40px;
      color: var(--cyber-glow);
      margin-bottom: 10px;
      animation: float 6s ease-in-out infinite;
    }

    .brand-title {
      font-size: 2.5rem;
      font-weight: 900;
      color: var(--cyber-text);
      letter-spacing: 3px;
      margin: 0;

      .accent {
        background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .brand-subtitle {
      color: var(--color-text-secondary);
      margin-top: 5px;
      letter-spacing: 2px;
      text-transform: uppercase;
      font-size: 0.9rem;
    }
  }
}

.login-hero {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin: 40px 0;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.hero-left, .hero-right {
  height: 100%;
}

.cyber-card {
  background: var(--cyber-bg-card);
  border: 1px solid var(--cyber-border);
  border-radius: 20px;
  padding: 40px;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border-radius: 21px;
    background: linear-gradient(
      45deg,
      var(--color-primary),
      var(--color-secondary),
      var(--color-accent)
    );
    z-index: -1;
    opacity: 0.1;
  }
}

.hero-card {
  height: 100%;
  display: flex;
  flex-direction: column;

  .hero-title {
    font-size: 3rem;
    font-weight: 900;
    line-height: 1.2;
    margin-bottom: 40px;
    color: var(--color-text-primary);

    .accent {
      background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  .features-list {
    flex: 1;
    margin-bottom: 40px;

    .feature-item {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 25px;
      padding: 15px;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 12px;
      border: 1px solid transparent;
      transition: all 0.3s ease;

      &:hover {
        border-color: var(--cyber-border);
        transform: translateX(5px);
      }

      .feature-icon {
        color: var(--cyber-glow);
        font-size: 1.5rem;
        min-width: 40px;
      }

      .feature-text {
        h4 {
          margin: 0 0 5px 0;
          color: var(--color-text-primary);
          font-size: 1.1rem;
        }

        p {
          margin: 0;
          color: var(--color-text-secondary);
          font-size: 0.9rem;
        }
      }
    }
  }

  .stats {
    display: flex;
    justify-content: space-around;
    padding-top: 30px;
    border-top: 1px solid rgba(0, 102, 255, 0.1);

    .stat {
      text-align: center;

      .stat-value {
        font-size: 2rem;
        font-weight: 800;
        color: var(--cyber-glow);
        margin-bottom: 5px;
      }

      .stat-label {
        font-size: 0.9rem;
        color: var(--color-text-muted);
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }
  }
}

.auth-card {
  .auth-card-header {
    text-align: center;
    margin-bottom: 30px;

    h3 {
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--color-text-primary);
      margin-bottom: 10px;
    }

    p {
      color: var(--color-text-secondary);
      font-size: 0.95rem;
    }
  }

  .quick-options {
    margin-top: 30px;

    .divider {
      display: flex;
      align-items: center;
      margin: 20px 0;
      color: var(--color-text-muted);

      &::before, &::after {
        content: '';
        flex: 1;
        height: 1px;
        background: linear-gradient(
          90deg,
          transparent,
          var(--cyber-border),
          transparent
        );
      }

      span {
        padding: 0 15px;
        font-size: 0.9rem;
      }
    }
  }
}

.login-footer {
  padding: 30px 0;
  text-align: center;

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-bottom: 15px;
    flex-wrap: wrap;

    .footer-link {
      color: var(--color-text-muted);
      font-size: 0.9rem;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: var(--cyber-glow);
      }
    }
  }

  .copyright {
    color: var(--color-text-muted);
    font-size: 0.85rem;
  }
}

.welcome-notification {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: var(--cyber-bg-card);
  border: 1px solid var(--cyber-border);
  border-radius: 12px;
  padding: 20px;
  max-width: 300px;
  z-index: 9999;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);

  .notification-content {
    display: flex;
    align-items: center;
    gap: 15px;

    .notification-icon {
      color: var(--color-positive);
      font-size: 1.5rem;
    }

    h4 {
      margin: 0 0 5px 0;
      color: var(--color-text-primary);
      font-size: 1rem;
    }

    p {
      margin: 0;
      color: var(--color-text-secondary);
      font-size: 0.9rem;
    }
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@keyframes scan {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(10px, -10px) rotate(1deg); }
  50% { transform: translate(5px, 5px) rotate(-1deg); }
  75% { transform: translate(-5px, 10px) rotate(1deg); }
}

@media (max-width: 768px) {
  .login-header {
    flex-direction: column;
    gap: 20px;

    .brand {
      order: -1;
    }
  }

  .hero-card,
  .auth-card {
    padding: 25px;
  }

  .stats {
    flex-direction: column;
    gap: 20px;
  }
}
</style>