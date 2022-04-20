import React from 'react';

// components
import Header from '../components/header'
import Nav from '../components/nav'
import Home from '../components/home'

export default function App() {
  return (
    <div className="min-h-screen grid-bg">
      <Header />
      <Nav />
      <Home />
    </div>
  )
}
