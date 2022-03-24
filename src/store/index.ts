import { createStore } from 'vuex'
// import { InjectionKey } from 'vue'
import axios from 'axios'

import { IGood, IGroup, Ilist, INames, IState } from '@/types/'

export default createStore<IState>({
  state: {
    list: <Ilist>{},
    names: <INames>{},
    goods: [],
    cart: []
  },
  getters: {
    list: ({ list }) => list,
    goods: ({ list }) => list?.Value.Goods,
    names: ({ names }) => names,
    cart: ({ cart }) => cart,
    cartSum: ({ cart }) =>
      cart.reduce((sum: number, cartItem: IGood) => {
        return sum + cartItem.amount * cartItem.cost
      }, 0)
  },
  mutations: {
    setList(state: IState, payload) {
      state.list = payload
    },
    setNames(state: IState, payload) {
      state.names = payload
    },
    setGoods(state: IState, payload: Array<IGroup>) {
      state.goods = payload
    },
    deleteCartGood(state: IState, cartGood) {
      const index = state.cart.findIndex((i) => i.itemID === cartGood.itemID)
      state.cart.splice(index, 1)
    },
    addCartItem(state: IState, cartGood: IGood) {
      state.cart.push(cartGood)
    },
    editCartItem(state: IState, cartItem: IGood) {
      const index = state.cart.findIndex((i) => i.itemID === cartItem.itemID)
      state.cart.splice(index, 1, cartItem)
    }
  },
  actions: {
    deleteCartGood({ commit }, cartGood) {
      commit('deleteCartGood', cartGood)
    },
    setCartItem({ state, commit }, { storeGood, addAmount }) {
      if (storeGood.amount >= addAmount) {
        const currentCartGood = state.cart.find((g) => g.itemID === storeGood.itemID)
        if (currentCartGood && currentCartGood.amount + addAmount <= storeGood.amount) {
          commit('editCartItem', {
            ...storeGood,
            maxAmoount: storeGood.amount,
            amount: currentCartGood.amount + addAmount
          })
        } else if (!currentCartGood) {
          commit('addCartItem', { ...storeGood, maxAmoount: storeGood.amount, amount: addAmount })
        }
      }
    },
    editCartItemAmount({ state, commit }, { itemID, addAmount }) {
      const currentCartGood = state.cart.find((g) => g.itemID === itemID)
      if (currentCartGood && currentCartGood.maxAmoount && addAmount <= currentCartGood.maxAmoount) {
        commit('editCartItem', {
          ...currentCartGood,
          amount: addAmount
        })
      }
    },
    getList({ commit }) {
      axios.get('http://localhost:4444/list/').then(({ data }) => {
        commit('setList', data)
      })
    },
    getNames({ commit }) {
      axios.get('http://localhost:4444/names/').then(({ data }) => {
        commit('setNames', data)
      })
    }
  }
})
