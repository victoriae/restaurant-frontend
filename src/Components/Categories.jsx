import React from 'react'
import useFetch from '../Hooks/useFetch'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../Redux/product'

const Categories = () => {
  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/categories`,
    []
  )
  const { category } = useSelector(
    (store) => store.productReducer
  )
  const dispatch = useDispatch()
  return (
    <>
      <div className='categories'>
        <h2 className="title">Categories</h2>
        {loading && <div>LOADING...</div>}
        {error && <div>ERROR</div>}
        {data && !loading && (
          <ul className="categories-list">
            <li className={category === null ? 'selected category' : 'category'}>
              <button className="category-link" onClick={() => dispatch(getProducts(null))}>All</button>
            </li>
            {data.map((cat) => (
              <li key={cat.id} className={category && category === cat.id ? 'selected category' : 'category'}>
                <button className="category-link"
                  onClick={() => dispatch(getProducts(cat.id))}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default Categories
