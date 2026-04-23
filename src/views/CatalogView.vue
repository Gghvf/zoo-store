<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useCartStore, type Product } from '../stores/cart'

const cartStore = useCartStore()

const categories = ref(['Все', 'Поводки', 'Ошейники', 'Карабины', 'Амуниция'])
const selectedCategory = ref('Все')

const products = ref<Product[]>([
  {
    id: 1,
    name: 'Поводок кожаный "Классик"',
    price: 1290,
    image: '🦮',
    category: 'Поводки',
    description: 'Прочный кожаный поводок для средних и крупных пород',
  },
  {
    id: 2,
    name: 'Ошейник с шипами "Защитник"',
    price: 890,
    image: '🐕',
    category: 'Ошейники',
    description: 'Стильный ошейник с декоративными шипами из нержавеющей стали',
  },
  {
    id: 3,
    name: 'Карабин металлический усиленный',
    price: 450,
    image: '🔗',
    category: 'Карабины',
    description: 'Надёжный карабин с поворотным механизмом, выдерживает до 50 кг',
  },
  {
    id: 4,
    name: 'Поводок-рулетка "Комфорт"',
    price: 1590,
    image: '🐩',
    category: 'Поводки',
    description: 'Автоматический поводок длиной 5 метров с кнопкой фиксации',
  },
  {
    id: 5,
    name: 'Ошейник светоотражающий "Безопасность"',
    price: 750,
    image: '✨',
    category: 'Ошейники',
    description: 'Яркий ошейник со светоотражающими элементами для вечерних прогулок',
  },
  {
    id: 6,
    name: 'Карабин-защёлка быстрый',
    price: 350,
    image: '⚡',
    category: 'Карабины',
    description: 'Удобная застёжка для быстрой смены поводка',
  },
  {
    id: 7,
    name: 'Шлейка анатомическая "Удобство"',
    price: 1890,
    image: '🐾',
    category: 'Амуниция',
    description: 'Мягкая шлейка с регулируемыми лямками для комфортной носки',
  },
  {
    id: 8,
    name: 'Набор "Щенок" (поводок + ошейник)',
    price: 1990,
    image: '🎁',
    category: 'Амуниция',
    description: 'Готовый комплект для маленьких щенков в стильном дизайне',
  },
])

const filteredProducts = ref(products.value)

onMounted(() => {
  gsap.from('.catalog-title', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
  })

  gsap.from('.category-filter', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.3,
    ease: 'power3.out',
  })

  gsap.from('.product-card', {
    opacity: 0,
    y: 50,
    stagger: 0.1,
    duration: 0.6,
    delay: 0.5,
    ease: 'power3.out',
  })
})

function filterByCategory(category: string) {
  selectedCategory.value = category
  if (category === 'Все') {
    filteredProducts.value = products.value
  } else {
    filteredProducts.value = products.value.filter(p => p.category === category)
  }

  // Re-animate products
  gsap.fromTo(
    '.product-card',
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.4,
      ease: 'power3.out',
    }
  )
}

function addToCart(product: Product, event: Event) {
  cartStore.addToCart(product)

  // Animation for add to cart
  const btn = event.target as HTMLElement
  gsap.to(btn, {
    scale: 1.2,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
  })
}
</script>

<template>
  <main class="catalog">
    <div class="catalog-header">
      <h1 class="catalog-title">Каталог товаров для животных</h1>
      <p class="catalog-subtitle">Качественная амуниция: поводки, ошейники, карабины и многое другое</p>
    </div>

    <!-- Category Filter -->
    <div class="category-filter">
      <button
        v-for="category in categories"
        :key="category"
        :class="['filter-btn', { active: selectedCategory === category }]"
        @click="filterByCategory(category)"
      >
        {{ category }}
      </button>
    </div>

    <!-- Products Grid -->
    <div class="products-grid">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card">
        <div class="product-image">{{ product.image }}</div>
        <div class="product-info">
          <span class="product-category">{{ product.category }}</span>
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-description">{{ product.description }}</p>
          <div class="product-footer">
            <span class="product-price">{{ product.price }} ₽</span>
            <button class="add-to-cart-btn" @click="(e) => addToCart(product, e)">
              В корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.catalog {
  padding-top: 100px;
  min-height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
  padding-left: 2rem;
  padding-right: 2rem;
}

.catalog-header {
  text-align: center;
  margin-bottom: 3rem;
}

.catalog-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.catalog-subtitle {
  color: #666;
  font-size: 1.1rem;
}

/* Category Filter */
.category-filter {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 3rem;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid #eee;
  background: white;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  color: #666;
}

.filter-btn:hover {
  border-color: #ff6b6b;
  color: #ff6b6b;
}

.filter-btn.active {
  background: linear-gradient(135deg, #ff6b6b, #ffa500);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
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
  transform: translateY(-8px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.product-image {
  height: 220px;
  background: linear-gradient(135deg, #fff5f5, #fff9e6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 6rem;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-info {
  padding: 1.5rem;
}

.product-category {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(255, 107, 107, 0.1);
  color: #ff6b6b;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.product-name {
  font-size: 1.1rem;
  color: #333;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
}

.product-description {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #ff6b6b;
}

.add-to-cart-btn {
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, #ff6b6b, #ffa500);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.add-to-cart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
  .catalog {
    padding-top: 80px;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .catalog-title {
    font-size: 1.8rem;
  }

  .category-filter {
    gap: 0.5rem;
  }

  .filter-btn {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
}
</style>
