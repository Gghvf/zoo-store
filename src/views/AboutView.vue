<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'

onMounted(() => {
  gsap.from('.about-title', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
  })

  gsap.from('.about-content', {
    opacity: 0,
    x: 50,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out',
  })

  gsap.from('.about-image', {
    opacity: 0,
    x: -50,
    scale: 0.9,
    duration: 1,
    delay: 0.5,
    ease: 'power3.out',
  })

  gsap.from('.team-card', {
    opacity: 0,
    y: 40,
    stagger: 0.2,
    duration: 0.8,
    delay: 0.8,
    ease: 'power3.out',
  })
})
</script>

<template>
  <main class="about">
    <div class="about-hero">
      <div class="about-content">
        <h1 class="about-title">О нашем магазине</h1>
        <p class="about-text">
          Мы создаём уникальные аксессуары для косплея и тематических мероприятий с 2020 года. 
          Наша миссия — помочь вам выразить свою индивидуальность через качественные и красивые изделия.
        </p>
        <p class="about-text">
          Каждый продукт создан с любовью и вниманием к деталям. Мы используем только безопасные 
          материалы и тщательно проверяем качество перед отправкой.
        </p>
      </div>
      <div class="about-image">🎭</div>
    </div>

    <section class="values-section">
      <h2 class="section-title">Наши ценности</h2>
      <div class="values-grid">
        <div class="value-card">
          <div class="value-icon">💖</div>
          <h3>Любовь к животным</h3>
          <p>Часть прибыли мы направляем в приюты для животных</p>
        </div>
        <div class="value-card">
          <div class="value-icon">🌱</div>
          <h3>Экологичность</h3>
          <p>Используем перерабатываемые материалы где это возможно</p>
        </div>
        <div class="value-card">
          <div class="value-icon">🤝</div>
          <h3>Поддержка сообщества</h3>
          <p>Спонсируем косплей-мероприятия и конкурсы</p>
        </div>
      </div>
    </section>

    <section class="team-section">
      <h2 class="section-title">Наша команда</h2>
      <div class="team-grid">
        <div class="team-card" v-for="i in 3" :key="i">
          <div class="team-avatar">{{ ['👩‍🎨', '👨‍🔧', '👩‍💼'][i - 1] }}</div>
          <h3>{{ ['Анна', 'Максим', 'Елена'][i - 1] }}</h3>
          <p class="team-role">{{ ['Дизайнер', 'Мастер', 'Менеджер'][i - 1] }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.about {
  padding-top: 100px;
  min-height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
  padding-left: 2rem;
  padding-right: 2rem;
}

.about-hero {
  display: flex;
  align-items: center;
  gap: 4rem;
  margin-bottom: 4rem;
  padding: 3rem 0;
}

.about-content {
  flex: 1;
}

.about-title {
  font-size: 3rem;
  color: #333;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ff6b6b, #ffa500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.about-text {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.about-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15rem;
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

/* Values Section */
.values-section {
  padding: 3rem 0;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 3rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.value-card {
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.value-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.value-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.value-card h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.value-card p {
  color: #666;
  line-height: 1.6;
}

/* Team Section */
.team-section {
  padding: 3rem 0;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.team-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.team-avatar {
  font-size: 5rem;
  margin-bottom: 1rem;
}

.team-card h3 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 0.25rem;
}

.team-role {
  color: #ff6b6b;
  font-weight: bold;
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .about {
    padding-top: 80px;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .about-hero {
    flex-direction: column-reverse;
    gap: 2rem;
    text-align: center;
  }

  .about-title {
    font-size: 2rem;
  }

  .about-image {
    font-size: 8rem;
  }

  .section-title {
    font-size: 1.8rem;
  }
}
</style>
