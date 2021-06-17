import React from 'react'
import {useSelector} from 'react-redux'

const Cart = () => {
  const cart = useSelector(store => store.cartReducer.cart)
  return (
    <button className="btn btn-cart">
      {`Cart: ${cart.length}`}
    </button>
  )
}

export default Cart
