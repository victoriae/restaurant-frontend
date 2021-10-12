import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentProduct } from '../Redux/product'
import { addToCart } from '../Redux/cart'
import addToCartIcon from '../assets/icons/carrito-de-compras-2.svg'
import { ProductDetail } from './ProductDetail'

const Products = () => {
  const { products, loading, error } = useSelector(
    (store) => store.productReducer
  )
  const cart = useSelector((store) => store.cartReducer.cart)
  const dispatch = useDispatch()

  const base_images_url = process.env.REACT_APP_IMAGES_URL

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
                  <li className="product-item" key={product.id}>
                    <button type="button"
                      className="open-modal product-image-container"
                      data-open="modal1"
                      onClick={() => {
                        dispatch(setCurrentProduct(product))
                        document.getElementById('modal1').classList.add('is-visible')
                      }}>
                      <img className="product-image" alt={product.name} src={base_images_url + product.image_file_name} />
                    </button>
                    <div className="product-row d-flex s-between">
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
            <ProductDetail />
          </>
        )}
      </div>
    </>
  )
}

export default Products
