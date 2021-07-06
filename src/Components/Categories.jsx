import React from 'react'
import useFetch from '../Hooks/useFetch'
import { useDispatch } from 'react-redux'
import { getProducts } from '../Redux/product'

const Categories = () => {
  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/categories`,
    []
  )
  const dispatch = useDispatch()
  return (
    <>
      <div className='categories'>
        <h2 className="title">Categories</h2>
        {loading && <div>LOADING...</div>}
        {error && <div>ERROR</div>}
        {data && (
          <ul className="categories-list">
            <li>
              <button className="category-link" onClick={() => dispatch(getProducts(null))}>All</button>
            </li>
            {data.map((category) => (
              <li key={category.id}>
                <button className="category-link"
                  onClick={() => dispatch(getProducts(category.id))}
                >
                  {category.name}
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
