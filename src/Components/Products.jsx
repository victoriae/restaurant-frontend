import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../Redux/cart'
import addToCartIcon from '../assets/icons/carrito-de-compras-2.svg'

const Products = () => {
  const { products, loading, error } = useSelector(
    (store) => store.productReducer
  )
  const cart = useSelector((store) => store.cartReducer.cart)
  const dispatch = useDispatch()

  const base_api_url = process.env.REACT_APP_API_URL

  return (
    <>
      <div className='products'>
        <h2 className="title">Products</h2>
        {loading && <div>LOADING...</div>}
        {error && <div>ERROR</div>}
        {products && !loading && (
          <>
            <ul className="products-list">
              {products.map((product) => {
                const productCounter = cart.filter((item) => item.id === product.id).length
                return (
                  <li key={product.id}>
                    <img className="product-image" alt={product.name} src={base_api_url + product.image.formats.thumbnail.url} />
                    <div className="product-row">
                      <div className="product-info">
                        <h3>{product.name}</h3>
                        <div className="product-price">${product.price}</div>
                      </div>
                      <div className="add-to-cart">
                        <button className="cart-icon" onClick={e => {
                          productCounter < product.stock ?
                            dispatch(addToCart(product)) :
                            e.target.classList.contains('icon') && e.target.classList.add('disable-cart')
                        }}>
                          <img id={`product-${product.id}`} className="icon" alt="" src={addToCartIcon} />
                          {productCounter !== 0 &&
                            <span className="product-cart-counter">
                              {productCounter}
                            </span>
                          }
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </>
        )}
      </div>
    </>
  )
}

export default Products
