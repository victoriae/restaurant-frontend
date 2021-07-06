import './assets/css/styles.css'
import { Provider } from 'react-redux'
import generateStore from './Redux/store'
import { getProducts } from './Redux/product'
import Home from './Pages/Home'

function App() {

  const store = generateStore()
  store.dispatch(getProducts())

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}

export default App;
