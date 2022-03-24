<template>
  <div class="cart-item">
    <div class="cart-item__name">{{ item.itemName }}</div>
    <div class="cart-item__amount">
      <input type="number" :value="item.amount" @input="setCustomAmount($event.target.value)" />
      <!--      <div-->
      <!--        class="cart-item__amount-tooltip"-->
      <!--        v-show="item.amount === item.maxAmoount || item.amount === item.maxAmoount - 1"-->
      <!--      >-->
      <!--        Количество товара ограничено-->
      <!--      </div>-->
      <!--      TODO показывать скрывать тултип в зависимости от наполенения корзины-->
    </div>
    <div class="cart-item__cost">Цена за шт.{{ item.cost }}₽</div>
    <div class="cart-item__sum">{{ item.cost * item.amount }}₽</div>
    <div class="cart-item__del">
      <input type="button" class="cart-item__del" value="удалить" @click="selfDelete(item)" />
    </div>
  </div>
</template>

<script lang="ts">
import { IGood } from '@/types'
import { defineComponent, PropType } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'CartItem',
  props: {
    item: {
      type: Object as PropType<IGood>,
      required: true
    }
  },
  methods: {
    ...mapActions(['deleteCartGood', 'editCartItemAmount']),
    selfDelete(item: IGood) {
      this.deleteCartGood(item)
    },
    setCustomAmount(amount: string) {
      this.editCartItemAmount({ itemID: this.item.itemID, addAmount: amount })
    }
  }
})
</script>

<style scoped lang="scss">
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: antiquewhite;

  &__name {
    flex: 1 0 35%;
  }

  &__amount {
    flex: 1 0 20%;
    position: relative;
    &-tooltip {
      position: absolute;
      bottom: 0;
      right: 100%;
      width: 200px;
      height: 44px;
      background: rgba(243, 243, 82, 0.99);
      transform: translate3d(10px, 40px, 0);
    }
  }

  &__cost {
    flex: 1 0 20%;
  }
  &__sum {
    flex: 1 0 10%;
  }

  &__del {
    flex: 1 0 10%;
  }
}
</style>
