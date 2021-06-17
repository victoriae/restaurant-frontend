import Axios from 'axios'

// Constants
const initialState = {
  products: [],
  category: null,
  start: 0,
  limit: 3,
  limitInit: 3,
  error: null,
  loading: false
}

// Types
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR'
const GET_PRODUCTS_LOADING = 'GET_PRODUCTS_LOADING'

// Reducer
export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.products,
        category: action.category,
        limit: action.limit
      }

    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.error
      }

    case GET_PRODUCTS_LOADING:
      return {
        ...state,
        loading: action.loading
      }

    default:
      return state
  }
}

// Actions
export const getProducts = (category = null, next = null) => (dispatch, getState) => {

  dispatch({
    type: GET_PRODUCTS_LOADING,
    loading: true
  })

  const { start, limit, limitInit } = getState().productReducer
  const categoryFilter = (category !== null)
                          ? `&category.id=${category}` : ''
  const loadLimit = (next !== null) ? limit + next : limitInit

  Axios(`https://defapi.herokuapp.com/products/?_start=${start}&_limit=${loadLimit}${categoryFilter}`)
    .then(response => {
      dispatch({
        type: GET_PRODUCTS,
        products: response.data,
        category,
        limit: loadLimit
      })
    })
    .catch(error => {
      dispatch({
        type: GET_PRODUCTS_ERROR,
        error
      })
    })
    .then(() => {
      dispatch({
        type: GET_PRODUCTS_LOADING,
        loading: false
      })
    })

}
