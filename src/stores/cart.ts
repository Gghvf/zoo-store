import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const total = computed(() => {
    return items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  })

  const itemCount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  function addToCart(product: Product) {
    const existingItem = items.value.find(item => item.product.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ product, quantity: 1 })
    }
  }

  function removeFromCart(productId: number) {
    items.value = items.value.filter(item => item.product.id !== productId)
  }

  function updateQuantity(productId: number, quantity: number) {
    const item = items.value.find(item => item.product.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    total,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }
})
