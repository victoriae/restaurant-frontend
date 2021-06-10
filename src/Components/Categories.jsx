import React from 'react'
import useFetch from '../Hooks/useFetch'
import { useDispatch } from 'react-redux'
import { getProducts } from '../Redux/product'

const Categories = () => {
  const { data, loading, error } = useFetch(
    'http://localhost:1337/categories',
    []
  )
  const dispatch = useDispatch()
  return (
    <>
      <div className='categories'>
        <h2>Categories</h2>
        {loading && <div>LOADING...</div>}
        {error && <div>ERROR</div>}
        {data && (
          <ul>
            {data.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => dispatch(getProducts(category.id))}
                >
                  {category.name}
                </button>
              </li>
            ))}
            <li>
              <button onClick={() => dispatch(getProducts(null))}>All</button>
            </li>
          </ul>
        )}
      </div>
    </>
  )
}

export default Categories
