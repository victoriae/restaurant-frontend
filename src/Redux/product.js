import Axios from 'axios'

// Constants
const initialState = {
  products: [],
  currentProduct: null,
  category: null,
  error: null,
  loading: false
}

// Types
const GET_PRODUCTS = 'GET_PRODUCTS'
const SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT'
const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR'
const GET_PRODUCTS_LOADING = 'GET_PRODUCTS_LOADING'

// Reducer
export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.products,
        category: action.category
      }
    case SET_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: action.currentProduct
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
export const getProducts = (category = null, next = null) => (dispatch) => {

  dispatch({
    type: GET_PRODUCTS_LOADING,
    loading: true
  })

  const categoryFilter = (category !== null)
    ? `?category.id=${category}` : ''

  Axios(`${process.env.REACT_APP_API_URL}/products/${categoryFilter}`)
    .then(response => {
      dispatch({
        type: GET_PRODUCTS,
        products: response.data,
        category
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

export const setCurrentProduct = (currentProduct) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_PRODUCT,
    currentProduct: currentProduct
  })
}
