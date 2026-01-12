<template>
  <div class="landing-page">
    <Background />
    <!-- Cyber background effects -->
    <div class="cyber-grid"></div>
    <div class="scan-line"></div>
    
    <!-- Main content -->
    <div class="landing-container">
      <!-- Header -->
      <div class="cyber-header">
        <div class="header-glow"></div>
        <span class="brand-title">Q<span class="accent">UALIFIED</span></span>
      </div>

      <!-- Hero section -->
      <main class="hero-section">
        <!-- Left column -->
        <div class="hero-left">
          <div class="cyber-card hero-card">
            <div class="card-border"></div>
            <div class="card-glow"></div>
            
            <h1 class="hero-title">
              <span class="title-line">Qualify your</span>
              <span class="title-line accent">JavaScript & TypeScript</span>
              <span class="title-line">skills</span>
            </h1>

            <p class="hero-subtitle">
              Master modern web development through interactive challenges, 
              real-world projects, and AI-powered mentorship.
            </p>

            <!-- Stats grid -->
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-number">100+</div>
                <div class="stat-label">Challenges</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">24/7</div>
                <div class="stat-label">AI Mentor</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right column -->
        <div class="hero-right">
          <div class="cyber-card progress-card">
            <div class="card-header">
              <h3 class="card-title">Your Journey</h3>
              <div class="level-badge">
                <span class="level-text">LEVEL 1</span>
              </div>
            </div>

            <!-- Progress track -->
            <div class="progress-track">
              <!-- XP Card -->
              <div class="xp-card cyber-card-small">
                <div class="xp-header">
                  <el-icon class="xp-icon"><Trophy /></el-icon>
                  <span>Earn XP</span>
                </div>
              </div>

              <!-- Challenges Card -->
              <div class="challenge-card cyber-card-small">
                <div class="challenge-header">
                  <el-icon class="challenge-icon"><Star /></el-icon>
                  <span>Answer Questions</span>
                </div>
              </div>

              <!-- Level Up Card -->
              <div class="level-card cyber-card-small">
                <div class="level-header">
                  <el-icon class="level-icon"><TrendCharts /></el-icon>
                  <span>Level Up</span>
                </div>
              </div>
            </div>

            <!-- Main CTA Button -->
            <el-button 
              class="start-training-btn" 
              type="primary" 
              size="large"
              @click="startTraining"
            >
              START TRAINING →
            </el-button>

            <!-- Quick stats -->
            <div class="quick-stats">
              <div class="quick-stat">
                <el-icon><Clock /></el-icon>
                <span>Avg. 15 min/day</span>
              </div>
              <div class="quick-stat">
                <el-icon><User /></el-icon>
                <span>10,000+ Developers</span>
              </div>
              <div class="quick-stat">
                <el-icon><SuccessFilled /></el-icon>
                <span>95% Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Features grid -->
      <div class="features-section">
        <h2 class="section-title">Why Qualified ?</h2>
        <div class="features-grid">
          <div class="feature-card cyber-card-small">
            <el-icon class="feature-icon"><Cpu /></el-icon>
            <h4>AI-Powered Learning</h4>
            <p>Get personalized challenges and instant code feedback</p>
          </div>
          <div class="feature-card cyber-card-small">
            <el-icon class="feature-icon"><Grid /></el-icon>
            <h4>Real Projects</h4>
            <p>Build portfolio-worthy apps while learning</p>
          </div>
          <div class="feature-card cyber-card-small">
            <el-icon class="feature-icon"><Rank /></el-icon>
            <h4>Gamified Progress</h4>
            <p>Earn badges, level up, and climb the leaderboard</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="landing-footer">
        <div class="footer-content">
          <span class="copyright">© 2024 Qualified. All code rights reserved.</span>
          <div class="footer-links">
            <el-link type="info" :underline="false">Privacy</el-link>
            <el-link type="info" :underline="false">Terms</el-link>
            <el-link type="info" :underline="false">Contact</el-link>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import IconShuttle from "@/components/icons/IconShuttle.vue"
import {
  Trophy, 
  Star, 
  Clock, 
  User, 
  SuccessFilled,
  Cpu,
  Grid,
  Rank,
  TrendCharts
} from '@element-plus/icons-vue'
import Background from '@/components/animated/Background.vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const startTraining = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.landing-page {
  min-height: 100vh;
  background: var(--cyber-bg-primary);
  position: relative;
  overflow-x: hidden;
  font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;

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
    pointer-events: none;
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
    pointer-events: none;
  }
}

.landing-container {
  position: relative;
  z-index: 3;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.cyber-header {
  padding: 20px 0;
  position: relative;
  
  .header-glow {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    height: 100px;
    background: radial-gradient(
      circle at center,
      rgba(0, 212, 255, 0.1) 0%,
      transparent 70%
    );
    filter: blur(20px);
  }

  .brand-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 24px;
    background: rgba(0, 102, 255, 0.1);
    border: 1px solid var(--cyber-border);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(0, 102, 255, 0.2);
      border-color: var(--cyber-glow);
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(0, 212, 255, 0.2);
    }

    .shuttle-icon {
      width: 28px;
      height: 28px;
      color: var(--cyber-glow);
      filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.7));
      animation: float 6s ease-in-out infinite;
    }

    .brand-title {
      font-size: 1.5rem;
      font-weight: 800;
      letter-spacing: 3px;
      color: var(--cyber-text);
      text-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
      
      .accent {
        color: var(--cyber-glow);
        background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
}

.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin: 60px 0;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 30px;
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
  position: relative;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  .card-border {
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
    opacity: 0.3;
  }

  .card-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--cyber-glow),
      transparent
    );
    filter: blur(2px);
  }
}

.hero-card {
  .hero-title {
    font-size: 3.5rem;
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: 24px;
    color: var(--color-text-primary);

    .title-line {
      display: block;

      &.accent {
        background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
      }
    }

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  .hero-subtitle {
    font-size: 1.1rem;
    line-height: 1.6;
    color: var(--color-text-secondary);
    margin-bottom: 40px;
    max-width: 500px;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 40px;

  .stat-item {
    text-align: center;
    padding: 20px;
    background: rgba(0, 102, 255, 0.05);
    border: 1px solid rgba(0, 102, 255, 0.1);
    border-radius: 12px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      border-color: var(--cyber-border);
      box-shadow: 0 10px 20px rgba(0, 212, 255, 0.1);
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--cyber-glow);
      margin-bottom: 8px;
    }

    .stat-label {
      font-size: 0.9rem;
      color: var(--color-text-muted);
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }
}

.progress-card {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    .card-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-text-primary);
    }

    .level-badge {
      background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
      padding: 6px 16px;
      border-radius: 20px;
      
      .level-text {
        font-size: 0.85rem;
        font-weight: 700;
        color: white;
        letter-spacing: 1px;
      }
    }
  }

  .progress-track {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 40px;
  }
}

.cyber-card-small {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(0, 102, 255, 0.2);
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--cyber-border);
    box-shadow: 0 10px 20px rgba(0, 212, 255, 0.1);
  }
}

.xp-card {
  .xp-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    
    .xp-icon {
      color: var(--cyber-glow);
      font-size: 1.2rem;
    }

    span {
      font-weight: 600;
      color: var(--color-text-primary);
    }
  }

  .xp-value {
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--cyber-glow);
    margin-bottom: 10px;
  }

  .xp-progress {
    margin-bottom: 10px;
  }

  .xp-hint {
    font-size: 0.85rem;
    color: var(--color-text-muted);
  }
}

.challenge-card {
  .challenge-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    
    .challenge-icon {
      color: var(--color-warning);
      font-size: 1.2rem;
    }

    span {
      font-weight: 600;
      color: var(--color-text-primary);
    }
  }

  .challenge-count {
    font-size: 2rem;
    font-weight: 800;
    color: var(--color-warning);
    margin-bottom: 15px;
  }

  .challenge-progress {
    display: flex;
    gap: 8px;
    margin-bottom: 10px;

    .challenge-dot {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid var(--color-text-muted);

      &.completed {
        background: var(--color-positive);
        border-color: var(--color-positive);
        box-shadow: 0 0 10px var(--color-positive);
      }
    }
  }

  .challenge-hint {
    font-size: 0.85rem;
    color: var(--color-text-muted);
  }
}

.level-card {
  .level-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    
    .level-icon {
      color: var(--color-accent);
      font-size: 1.2rem;
    }

    span {
      font-weight: 600;
      color: var(--color-text-primary);
    }
  }

  .level-indicator {
    display: flex;
    align-items: center;
    gap: 15px;

    .level-bar {
      flex: 1;
      height: 8px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      overflow: hidden;

      .level-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
        border-radius: 4px;
        transition: width 1s ease;
      }
    }

    .level-text-small {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      white-space: nowrap;
    }
  }

  .level-hint {
    font-size: 0.85rem;
    color: var(--color-text-muted);
    margin-top: 10px;
  }
}

.start-training-btn {
  width: 100%;
  height: 60px;
  background: linear-gradient(45deg, var(--color-primary), var(--color-accent));
  border: none;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: white;
  transition: all 0.3s ease;
  margin-bottom: 30px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(0, 102, 255, 0.4);
    filter: brightness(1.1);
  }

  &:active {
    transform: translateY(0);
  }
}

.quick-stats {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  background: rgba(0, 102, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(0, 102, 255, 0.1);

  .quick-stat {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--color-text-secondary);
    font-size: 0.9rem;

    .el-icon {
      color: var(--cyber-glow);
    }
  }
}

.features-section {
  margin: 80px 0;

  .section-title {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 50px;
    color: var(--color-text-primary);
    
    &::after {
      content: '';
      display: block;
      width: 100px;
      height: 4px;
      background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
      margin: 15px auto;
      border-radius: 2px;
    }
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .feature-card {
    text-align: center;
    padding: 30px;

    .feature-icon {
      font-size: 3rem;
      color: var(--cyber-glow);
      margin-bottom: 20px;
    }

    h4 {
      font-size: 1.3rem;
      font-weight: 700;
      margin-bottom: 15px;
      color: var(--color-text-primary);
    }

    p {
      color: var(--color-text-secondary);
      line-height: 1.6;
    }
  }
}

.landing-footer {
  margin-top: 80px;
  padding: 30px 0;
  border-top: 1px solid rgba(0, 102, 255, 0.2);

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--color-text-muted);

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 20px;
      text-align: center;
    }

    .copyright {
      font-size: 0.9rem;
    }

    .footer-links {
      display: flex;
      gap: 30px;

      .el-link {
        color: var(--color-text-muted);
        font-size: 0.9rem;
        transition: color 0.3s ease;

        &:hover {
          color: var(--cyber-glow);
        }
      }
    }
  }
}

// Animations
@keyframes scan {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(2deg);
  }
}

@keyframes pulse {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .landing-container {
    padding: 15px;
  }

  .hero-card {
    padding: 25px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: 1fr !important;
  }

  .start-training-btn {
    height: 50px;
    font-size: 1rem;
  }
}
</style>