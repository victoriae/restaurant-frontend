import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../Redux/cart'
import { getProducts } from '../Redux/product'

const Products = () => {
  const { products, category, loading, error } = useSelector(
    (store) => store.productReducer
  )
  const cart = useSelector((store) => store.cartReducer.cart)
  const dispatch = useDispatch()

  return (
    <>
      <div className='products'>
        <h2 className="title">Products</h2>
        {loading && <div>LOADING...</div>}
        {error && <div>ERROR</div>}
        {products && (
          <>
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  <h2>{product.name}</h2>
                  <div>{product.description}</div>
                  <button onClick={() => dispatch(addToCart(product.id))}>
                    +
                  </button>
                  <span>
                    {cart.filter((item) => item === product.id).length}
                  </span>
                  <button onClick={() => dispatch(removeFromCart(product.id))}>
                    -
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={() => dispatch(getProducts(category, 3))}>
              Load more
            </button>
          </>
        )}
      </div>
    </>
  )
}

export default Products
