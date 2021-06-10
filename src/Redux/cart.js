// Constants
const initialState = {
  cart: []
}

// Types
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

// Reducer
export default function cartReducer(state = initialState, {type, id}) {
  switch (type) {
    case ADD_TO_CART:
      return {...state, cart: state.cart.concat(id)}
      
    case REMOVE_FROM_CART:
      const itemIndex = state.cart.findIndex(item => item === id)
      return {...state, cart: state.cart.filter((_, index) => index !== itemIndex)}
  
    default:
      return state
  }
}

// Actions
export const addToCart = id => ({
  type: ADD_TO_CART,
  id
})

export const removeFromCart = id => ({
  type: REMOVE_FROM_CART,
  id
})