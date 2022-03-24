<template>
  <div class="main">
    <h1 class="goods-list-title">В продаже</h1>
    <div class="goods-list-wrapper">
      <GoodsList />
    </div>
    <div class="cart-wrapper">
      <h1 class="cart-title">Корзина</h1>
      <Cart />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GoodsList from '@/components/GoodsList.vue'
import Cart from '@/components/Cart.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    GoodsList,
    Cart
  }
})
</script>
<style lang="scss" scoped>
.goods-list-wrapper {
  margin: 20px auto 0;
  width: 100%;
  max-width: 1080px;
}
.cart-wrapper {
  margin: 60px auto 0;
  width: 100%;
  max-width: 1080px;
}
</style>
