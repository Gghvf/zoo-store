<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../../stores/cart'
import { gsap } from 'gsap'

const router = useRouter()
const cartStore = useCartStore()
const isMenuOpen = ref(false)
const isCartOpen = ref(false)

const menuItems = [
  { name: 'Главная', path: '/' },
  { name: 'Каталог', path: '/catalog' },
  { name: 'О нас', path: '/about' },
]

onMounted(() => {
  gsap.from('.header-logo', { opacity: 0, x: -50, duration: 1, ease: 'power3.out' })
  gsap.from('.header-nav', { opacity: 0, y: -20, duration: 1, delay: 0.3, ease: 'power3.out' })
  gsap.from('.header-actions', { opacity: 0, x: 50, duration: 1, delay: 0.5, ease: 'power3.out' })
})

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function toggleCart() {
  isCartOpen.value = !isCartOpen.value
}

function navigateTo(path: string) {
  router.push(path)
  isMenuOpen.value = false
}
</script>

<template>
  <header class="header">
    <div class="header-container">
      <div class="header-logo" @click="navigateTo('/')">
<<<<<<< HEAD
        <span class="logo-text">🐾 Ushki</span>
=======
        <span class="logo-text">🐾 Ushki Clone</span>
>>>>>>> b59afaa89e07548a42071155c857ab6f84ef020a
      </div>

      <nav class="header-nav" :class="{ open: isMenuOpen }">
        <ul class="nav-list">
          <li v-for="item in menuItems" :key="item.path" class="nav-item">
            <button @click="navigateTo(item.path)" class="nav-link">{{ item.name }}</button>
          </li>
        </ul>
      </nav>

      <div class="header-actions">
        <button class="action-btn cart-btn" @click="toggleCart">
          🛒
          <span v-if="cartStore.itemCount > 0" class="cart-count">{{ cartStore.itemCount }}</span>
        </button>
        <button class="action-btn menu-btn" @click="toggleMenu">
          ☰
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <transition name="fade">
      <div v-if="isMenuOpen" class="menu-overlay" @click="toggleMenu"></div>
    </transition>

    <!-- Mobile Menu -->
    <transition name="slide-left">
      <div v-if="isMenuOpen" class="mobile-menu">
        <ul class="mobile-nav-list">
          <li v-for="item in menuItems" :key="item.path" class="mobile-nav-item">
            <button @click="navigateTo(item.path)" class="mobile-nav-link">{{ item.name }}</button>
          </li>
        </ul>
      </div>
    </transition>

    <!-- Cart Sidebar -->
    <transition name="slide-right">
      <div v-if="isCartOpen" class="cart-sidebar">
        <div class="cart-header">
          <h3>Корзина</h3>
          <button class="close-btn" @click="toggleCart">×</button>
        </div>
        <div class="cart-content">
          <div v-if="cartStore.items.length === 0" class="empty-cart">
            <p>Корзина пуста</p>
          </div>
          <div v-else class="cart-items">
            <div v-for="item in cartStore.items" :key="item.product.id" class="cart-item">
              <img :src="item.product.image" :alt="item.product.name" class="cart-item-image" />
              <div class="cart-item-info">
                <h4>{{ item.product.name }}</h4>
                <p class="cart-item-price">{{ item.product.price }} ₽</p>
                <div class="quantity-controls">
                  <button @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)">-</button>
                  <span>{{ item.quantity }}</span>
                  <button @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)">+</button>
                </div>
              </div>
              <button class="remove-btn" @click="cartStore.removeFromCart(item.product.id)">×</button>
            </div>
          </div>
        </div>
        <div v-if="cartStore.items.length > 0" class="cart-footer">
          <div class="cart-total">
            <span>Итого:</span>
            <span>{{ cartStore.total }} ₽</span>
          </div>
          <button class="checkout-btn">Оформить заказ</button>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 1rem 2rem;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-logo {
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff6b6b;
  transition: transform 0.3s ease;
}

.header-logo:hover {
  transform: scale(1.05);
}

.logo-text {
  background: linear-gradient(135deg, #ff6b6b, #ffa500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-nav {
  display: none;
}

@media (min-width: 768px) {
  .header-nav {
    display: block;
  }
}

.nav-list {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-item {
  position: relative;
}

.nav-link {
  background: none;
  border: none;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, #ff6b6b, #ffa500);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link:hover {
  color: #ff6b6b;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.action-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  position: relative;
}

.action-btn:hover {
  background: rgba(255, 107, 107, 0.1);
  transform: scale(1.1);
}

.cart-btn {
  position: relative;
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff6b6b;
  color: white;
  font-size: 0.75rem;
  padding: 0.2rem 0.4rem;
  border-radius: 50%;
  min-width: 1.2rem;
  text-align: center;
}

/* Mobile Menu */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;
}

.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background: white;
  z-index: 1002;
  padding: 2rem;
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.2);
}

.mobile-nav-list {
  list-style: none;
  padding: 0;
  margin-top: 4rem;
}

.mobile-nav-item {
  margin-bottom: 1rem;
}

.mobile-nav-link {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  font-size: 1.2rem;
  padding: 1rem;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.mobile-nav-link:hover {
  background: rgba(255, 107, 107, 0.1);
  color: #ff6b6b;
}

/* Cart Sidebar */
.cart-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 350px;
  height: 100vh;
  background: white;
  z-index: 1003;
  box-shadow: -2px 0 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.cart-header h3 {
  margin: 0;
  font-size: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #999;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: #333;
}

.cart-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.empty-cart {
  text-align: center;
  color: #999;
  padding: 2rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
  position: relative;
}

.cart-item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

.cart-item-info {
  flex: 1;
}

.cart-item-info h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
}

.cart-item-price {
  margin: 0 0 0.5rem 0;
  color: #ff6b6b;
  font-weight: bold;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-controls button {
  width: 28px;
  height: 28px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quantity-controls button:hover {
  background: #ff6b6b;
  color: white;
  border-color: #ff6b6b;
}

.remove-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #999;
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.3s ease;
}

.remove-btn:hover {
  color: #ff6b6b;
}

.cart-footer {
  padding: 1.5rem;
  border-top: 1px solid #eee;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #ff6b6b, #ffa500);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
