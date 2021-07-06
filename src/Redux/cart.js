// Constants
const initialState = {
  cart: [],
  totalPrice: 0
}

// Types
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

// Reducer
export default function cartReducer(state = initialState, {type, product}) {
  switch (type) {
    case ADD_TO_CART:
      return {...state,
              cart: state.cart.concat(product),
              totalPrice: state.totalPrice + product.price}
      
    case REMOVE_FROM_CART:
      const itemIndex = state.cart.findIndex(item => item.id === product.id)
      return {...state,
              cart: state.cart.filter((_, index) => index !== itemIndex),
              totalPrice: state.totalPrice - product.price}
  
    default:
      return state
  }
}

// Actions
export const addToCart = product => ({
  type: ADD_TO_CART,
  product
})

export const removeFromCart = product => ({
  type: REMOVE_FROM_CART,
  product
})