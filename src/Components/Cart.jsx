import React from 'react'
import {useSelector} from 'react-redux'

const Cart = () => {
  const cart = useSelector(store => store.cartReducer.cart)
  return (
    <div>
      {`Cart: ${cart.length}`}
    </div>
  )
}

export default Cart
