<script setup lang="ts">
import { gsap } from 'gsap'
import { onMounted, ref } from 'vue'

const visibleItems = ref(false)

onMounted(() => {
  // Hero section animations
  gsap.from('.hero-title', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
  })

  gsap.from('.hero-subtitle', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out',
  })

  gsap.from('.hero-image', {
    opacity: 0,
    scale: 0.8,
    rotation: -10,
    duration: 1.2,
    delay: 0.5,
    ease: 'back.out(1.7)',
  })

  gsap.from('.hero-cta', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.8,
    ease: 'power3.out',
  })

  // Features animation on scroll
  setTimeout(() => {
    visibleItems.value = true
    animateFeatures()
  }, 1000)
})

function animateFeatures() {
  gsap.from('.feature-card', {
    scrollTrigger: '.features-section',
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power3.out',
  })
}
</script>

<template>
  <main class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          Качественная амуниция<br />
          <span class="highlight">для ваших питомцев</span>
        </h1>
        <p class="hero-subtitle">
          Поводки, ошейники, карабины и другие необходимые аксессуары для комфортных прогулок с собакой
        </p>
        <button class="hero-cta">Смотреть каталог</button>
      </div>
      <div class="hero-image-container">
        <div class="hero-image">🐕</div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section" v-if="visibleItems">
      <h2 class="section-title">Почему выбирают нас</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">💪</div>
          <h3>Прочность</h3>
          <p>Надёжные материалы, проверенные временем и активными прогулками</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🎨</div>
          <h3>Дизайн</h3>
          <p>Стильные решения для современных собак и их хозяев</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🚚</div>
          <h3>Доставка</h3>
          <p>Быстрая доставка по всей стране с отслеживанием заказа</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🐾</div>
          <h3>Забота</h3>
          <p>Каждая покупка помогает приютам для бездомных животных</p>
        </div>
      </div>
    </section>

    <!-- Popular Products Preview -->
    <section class="products-preview">
      <h2 class="section-title">Популярные товары</h2>
      <div class="products-grid">
        <div class="product-card" v-for="i in 4" :key="i">
          <div class="product-image">{{ ['🦮', '🐕', '🔗', '🐾'][i - 1] }}</div>
          <h3 class="product-name">{{ ['Поводок', 'Ошейник', 'Карабин', 'Шлейка'][i - 1] }}</h3>
          <p class="product-price">{{ i * 450 }} ₽</p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home {
  padding-top: 80px;
}

/* Hero Section */
.hero {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  gap: 2rem;
}

.hero-content {
  flex: 1;
  max-width: 600px;
}

.hero-title {
  font-size: 3rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #333;
}

.highlight {
  background: linear-gradient(135deg, #ff6b6b, #ffa500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-cta {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  background: linear-gradient(135deg, #ff6b6b, #ffa500);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.hero-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
}

.hero-image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image {
  font-size: 15rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Features Section */
.features-section {
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

/* Products Preview */
.products-preview {
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.product-image {
  height: 250px;
  background: linear-gradient(135deg, #fff5f5, #fff9e6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
}

.product-name {
  padding: 1rem;
  font-size: 1.1rem;
  margin: 0;
  color: #333;
}

.product-price {
  padding: 0 1rem 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff6b6b;
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    flex-direction: column-reverse;
    text-align: center;
    padding-top: 2rem;
  }

  .hero-content {
    max-width: 100%;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-image {
    font-size: 8rem;
  }

  .section-title {
    font-size: 1.8rem;
  }
}
</style>
