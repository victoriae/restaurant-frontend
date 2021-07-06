import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../Redux/cart'

const Cart = () => {
  const { cart, totalPrice } = useSelector(store => store.cartReducer)
  const dispatch = useDispatch()

  const uniqueProducts = cart.reduce((prev, product) => {
    const existingProduct = prev.find(({ id }) => id === product.id);
    if (existingProduct) {
      existingProduct.qty = existingProduct.qty + 1
    } else {
      product.qty = 1
      prev.push(product)
    }
    return prev;
  }, []);

  return (
    <>
      <button className="btn btn-cart">
        {`Cart: ${cart.length}`}
      </button>
      <ul className="cart-details">
        {
          uniqueProducts.map(product => (
            <li key={product.id}>
              <span>{product.name}</span>
              <div className="cartControls">
                <button onClick={() => {
                  const el = document.getElementById(`product-${product.id}`)
                  product.qty < product.stock ?
                    dispatch(addToCart(product)) :
                    !el.classList.contains('disable-cart') && el.classList.add('disable-cart')
                }}>+</button>
                <span>
                  {product.qty}
                </span>
                <button onClick={() => {
                  dispatch(removeFromCart(product))
                  const el = document.getElementById(`product-${product.id}`)
                  el.classList.contains('disable-cart') && el.classList.remove('disable-cart')
                }}>-</button>
              </div>
              <div className="product-price">${product.price}</div>
            </li>
          ))
        }
      </ul>
      <div className="total-price">Total: {totalPrice}</div>
    </>
  )
}

export default Cart
