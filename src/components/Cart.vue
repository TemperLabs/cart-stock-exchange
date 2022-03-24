<template>
  <div class="cart">
    <div class="cart-inner">
      <CartItem v-for="cartItem in cartItems" :item="cartItem" :key="cartItem.itemID" />
      <div class="cart-sum">Общая сумма {{ cartSum }} ₽</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import CartItem from '@/components/CartItem.vue'

export default defineComponent({
  name: 'Cart',
  components: {
    CartItem
  },
  computed: {
    ...mapGetters({ cartItems: 'cart', cartSum: 'cartSum' })
  }
})
</script>

<style scoped></style>
