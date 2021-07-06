import React from 'react'
import Header from '../Components/Header'
import Cart from '../Components/Cart'
import Categories from '../Components/Categories'
import Products from '../Components/Products'

const Home = () => {

  return (
    <>
      <Header />
      <div className="container">
        <aside className="sidebar">
          <Categories />
        </aside>
        <main className="main">
          <Products />
        </main>
        <aside className="sidebar">
          <Cart />
        </aside>
      </div>
    </>
  )
}

export default Home
