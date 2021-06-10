import './App.css';
import Menu from './Pages/Menu';
import { Provider } from 'react-redux'
import generateStore from './Redux/store'
import Cart from './Components/Cart';
import { getProducts } from './Redux/product'

function App() {

  const store = generateStore()
  store.dispatch(getProducts())

  return (
    <Provider store={store}>
      <Cart />
      <Menu />
    </Provider>
  )
}

export default App;
