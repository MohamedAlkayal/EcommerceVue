import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: [],
    user: null
  },
  mutations: {
    ADD_TO_CART(state, payload) {
      if (!state.cart.some((item) => item.id === payload.product?.id)) {
        state.cart.push(payload.product)
      }
    },
    EMPTY_CART(state) {
      state.cart = []
    },
    DELETE_FROM_CART(state, payload) {
      if (state.cart.some((item) => item.id === payload.product?.id)) {
        state.cart = state.cart.filter((item) => item.id !== payload.product.id)
      }
    },
    ADD_USER(state, payload) {
      state.user = payload.user
    },
    REMOVE_USER(state) {
      state.user = null
    }
  },
  getters: {
    cartItemsCount(state) {
      return state.cart.length
    }
  }
})
