<template>
  <div class="group">
    <div v-for="(group, index) in groups" :key="index" class="group__item">
      <div class="group__item-title">{{ group.groupName }}</div>
      <div class="group__item-content-wrap">
        <div class="group__item-content" v-for="good in group.groupGoods" :key="good.itemID" @click="AddToCart(good)">
          <span>{{ good.itemName }} ({{ good.amount }})</span>
          <span>{{ good.cost }}₽</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IGood, IGoodBE, IGroup } from '@/types'
import { defineComponent } from 'vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { exchangeHelper, exchangeRates } from '@/helpers'

export default defineComponent({
  name: 'GoodsList',
  computed: {
    ...mapGetters(['goods', 'names']),
    groups(): Array<IGroup> {
      if (this.names) {
        return Object.entries(this.names).map((name: any) => {
          const groupGoods = this.goods
            ?.filter((good: IGoodBE) => good.G.toString() === name[0])
            .map((item: IGoodBE): IGood => {
              return {
                cost: exchangeHelper(item.C, exchangeRates.USD),
                amount: item.P,
                itemID: item.T,
                itemName: name[1].B[item.T].N
              }
            })
          return {
            ID: Number(name[0]),
            groupName: name[1].G,
            groupGoods: groupGoods
          }
        })
      } else {
        return []
      }
    }
  },
  methods: {
    ...mapActions(['getList', 'getNames', 'setCartItem']),
    ...mapMutations(['setGoods']),
    AddToCart(good: IGood) {
      this.setCartItem({ storeGood: good, addAmount: 1 })
    }
  },
  watch: {
    groups(val) {
      if (val.length) {
        this.setGoods(val)
      }
    }
  },
  mounted() {
    this.getList()
    this.getNames()
    setInterval(() => {
      this.getList()
      this.getNames()
    }, 15000)
  }
})
</script>

<style scoped lang="scss">
.group {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: bisque;

  &__item {
    border-top: 1px solid #575757;
    border-left: 1px solid #575757;
    border-right: 1px solid #575757;
    &:last-child {
      border-bottom: 1px solid #575757;
    }

    &-content-wrap {
      display: flex;
      flex-wrap: wrap;
    }
    &-content {
      display: flex;
      justify-content: space-between;
      flex: 0 0 50%;
      padding: 10px;
      cursor: pointer;

      &:hover {
        background: #f8f80c;
      }
      &:nth-child(odd) {
        border-right: 1px solid #575757;
      }
      &:nth-child(n) {
        border-bottom: 1px solid #575757;
      }
      &:nth-last-child(-n + 2):nth-child(odd) {
        border-bottom: none;
      }
    }

    &-title {
      background: #a9a9a9;
      border-bottom: 1px solid #575757;
    }
  }
}
</style>
