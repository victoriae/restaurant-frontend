import './css/styles.css'
import Menu from './Pages/Menu'
import { Provider } from 'react-redux'
import generateStore from './Redux/store'
import Cart from './Components/Cart'
import { getProducts } from './Redux/product'

function App() {

  const store = generateStore()
  store.dispatch(getProducts())

  return (
    <Provider store={store}>
      <div className="header py-3">
        <div className="container mx-auto header">
          <Cart />
        </div>
      </div>
      <div className="container mx-auto">
        <Menu />
      </div>
    </Provider>
  )
}

export default App;
