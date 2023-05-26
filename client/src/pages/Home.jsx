import React from 'react'
//import Hero from '../components/Hero'
import Categories from '../components/Categories'
import NewsLetter from '../components/NewsLetter'
import { Toaster } from 'react-hot-toast'

const Home = () => {
  return (
    <div>
      <Toaster />
      {/* <Hero /> */}
      <Categories />
      <NewsLetter />
    </div>
  )
}

export default Home