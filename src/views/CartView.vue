<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

onMounted(() => {
  gsap.from('.cart-title', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
  })

  gsap.from('.cart-items-list', {
    opacity: 0,
    x: 50,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out',
  })
})

function continueShopping() {
  router.push('/catalog')
}

function checkout() {
  alert('Заказ оформлен! Спасибо за покупку!')
  cartStore.clearCart()
  router.push('/')
}
</script>

<template>
  <main class="cart-page">
    <div class="cart-container">
      <h1 class="cart-title">Корзина</h1>

      <div v-if="cartStore.items.length === 0" class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <h2>Корзина пуста</h2>
        <p>Добавьте товары из каталога</p>
        <button class="shop-btn" @click="continueShopping">Перейти в каталог</button>
      </div>

      <div v-else class="cart-content">
        <div class="cart-items-list">
          <div v-for="item in cartStore.items" :key="item.product.id" class="cart-item-row">
            <div class="item-image">{{ item.product.image }}</div>
            <div class="item-details">
              <h3>{{ item.product.name }}</h3>
              <p class="item-category">{{ item.product.category }}</p>
              <p class="item-price">{{ item.product.price }} ₽</p>
            </div>
            <div class="item-quantity">
              <button @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)">+</button>
            </div>
            <div class="item-total">
              {{ item.product.price * item.quantity }} ₽
            </div>
            <button class="remove-item-btn" @click="cartStore.removeFromCart(item.product.id)">×</button>
          </div>
        </div>

        <div class="cart-summary">
          <h3>Итого</h3>
          <div class="summary-row">
            <span>Товары ({{ cartStore.itemCount }}):</span>
            <span>{{ cartStore.total }} ₽</span>
          </div>
          <div class="summary-row">
            <span>Доставка:</span>
            <span>Бесплатно</span>
          </div>
          <div class="summary-total">
            <span>К оплате:</span>
            <span>{{ cartStore.total }} ₽</span>
          </div>
          <button class="checkout-btn" @click="checkout">Оформить заказ</button>
          <button class="continue-btn" @click="continueShopping">Продолжить покупки</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.cart-page {
  padding-top: 100px;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 2rem;
  padding-right: 2rem;
}

.cart-container {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.cart-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

/* Empty Cart */
.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-cart-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
}

.empty-cart h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.empty-cart p {
  color: #666;
  margin-bottom: 2rem;
}

.shop-btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #ff6b6b, #ffa500);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.shop-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
}

/* Cart Content */
.cart-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
}

.cart-items-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item-row {
  display: grid;
  grid-template-columns: 80px 1fr 120px 120px 50px;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.cart-item-row:hover {
  background: #fff5f5;
}

.item-image {
  font-size: 3rem;
  text-align: center;
}

.item-details h3 {
  font-size: 1rem;
  color: #333;
  margin: 0 0 0.25rem 0;
}

.item-category {
  font-size: 0.85rem;
  color: #ff6b6b;
  margin: 0 0 0.25rem 0;
}

.item-price {
  font-size: 0.95rem;
  color: #666;
  margin: 0;
}

.item-quantity {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.item-quantity button {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.item-quantity button:hover {
  background: #ff6b6b;
  color: white;
  border-color: #ff6b6b;
}

.item-quantity span {
  min-width: 30px;
  text-align: center;
  font-weight: bold;
}

.item-total {
  font-size: 1.1rem;
  font-weight: bold;
  color: #ff6b6b;
  text-align: right;
}

.remove-item-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #999;
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.3s ease;
}

.remove-item-btn:hover {
  color: #ff6b6b;
}

/* Cart Summary */
.cart-summary {
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 12px;
  height: fit-content;
  position: sticky;
  top: 100px;
}

.cart-summary h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: #666;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0;
  padding-top: 1.5rem;
  border-top: 2px solid #ddd;
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #ff6b6b, #ffa500);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
}

.continue-btn {
  width: 100%;
  padding: 1rem;
  background: white;
  color: #ff6b6b;
  border: 2px solid #ff6b6b;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.continue-btn:hover {
  background: rgba(255, 107, 107, 0.1);
}

/* Responsive */
@media (max-width: 900px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-summary {
    position: static;
  }

  .cart-item-row {
    grid-template-columns: 60px 1fr 100px 40px;
    gap: 0.5rem;
  }

  .item-total {
    grid-column: 2;
    text-align: left;
    font-size: 0.95rem;
  }

  .remove-item-btn {
    grid-column: 4;
  }
}

@media (max-width: 768px) {
  .cart-page {
    padding-top: 80px;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .cart-title {
    font-size: 1.8rem;
  }

  .cart-item-row {
    grid-template-columns: 50px 1fr 80px 30px;
  }

  .item-quantity {
    grid-column: 2;
    justify-content: flex-start;
  }
}
</style>
