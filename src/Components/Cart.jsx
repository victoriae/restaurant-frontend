import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../Redux/cart'
import cartIcon from '../assets/icons/carrito-de-compras.svg'

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

  const showCartItems = cart.length !== 0

  return (
    <div className="cart-container">
      <div className="cart-counter d-flex s-between">
        <h2 className="cart-label">
          Cart
        </h2>
        <div className="cart-icon">
          <img className="icon" alt="" src={cartIcon} />
          {showCartItems &&
            <span className="product-cart-counter">
              {cart.length}
            </span>
          }
        </div>
      </div>
      {showCartItems &&
        <>
          <ul className="cart-details">
            {
              uniqueProducts.map(product => (
                <li className="cart-details-item" key={product.id}>
                  <h3 className="cart-details-title">{product.name}</h3>
                  <div className="d-flex s-between">
                    <div className="cartControls">
                      <button className="cart-button" onClick={() => {
                        dispatch(removeFromCart(product))
                        const el = document.getElementById(`product-${product.id}`)
                        el.classList.contains('disable-cart') && el.classList.remove('disable-cart')
                      }}>-</button>
                      <span className="item-cart-counter">
                        {product.qty}
                      </span>
                      <button className="cart-button" onClick={() => {
                        const el = document.getElementById(`product-${product.id}`)
                        product.qty < product.stock ?
                          dispatch(addToCart(product)) :
                          !el.classList.contains('disable-cart') && el.classList.add('disable-cart')
                      }}>+</button>
                    </div>
                    <div className="product-price">${product.price}</div>
                  </div>
                </li>
              ))
            }
          </ul>
          <div className="total-price d-flex s-between">
            <div className="total-price-label">TOTAL</div>
            <div className="total-price-value">${totalPrice}</div>
          </div>
        </>
      }
    </div >
  )
}

export default Cart
