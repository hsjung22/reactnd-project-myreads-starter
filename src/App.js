import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

function BooksApp() {
  return (
    <div className="app">
      <Route
        path="/search"
        component={SearchBooks}
      />
      <Route
        exact
        path="/"
        component={ListBooks}
      />
    </div>
  )
}

export default BooksApp