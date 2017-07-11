import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => 
      this.setState({ books })
    )
  }

  handleShelfUpdate = (book, shelf) => {
    this.setState(prevState => ({
      books: prevState.books.map(b =>
        (b.id === book.id)
          ? {...b, shelf}
          : b
      )
    }))

    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          component={SearchBooks}
        />
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              books={this.state.books}
              handleShelfUpdate={this.handleShelfUpdate}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp