import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

class BooksApp extends Component {
  state = {
    shelvedBooks: [],
    bookResults: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(shelvedBooks =>
      this.setState({ shelvedBooks })
    )
  }

  handleShelfUpdate = (book, shelf) => {

    this.setState(prevState => ({
      shelvedBooks: prevState.shelvedBooks.map(b =>
        b.id === book.id
          ? {...b, shelf}
          : b
      ),
      bookResults: prevState.bookResults.map(b =>
        b.id === book.id
          ? {...b, shelf}
          : b
      )
    }))
    BooksAPI.update(book, shelf)
  }

  handleSearchResults = (bookResults) => {
    this.setState({ bookResults: this.findCorrectShelf(bookResults) })
  }

  findCorrectShelf = (bookResults) => {
    bookResults.map(bookResult => {
      let bookOnShelf = this.state.shelvedBooks.filter(shelvedBook =>
                    bookResult.id === shelvedBook.id
                  )[0]

      bookResult.shelf = bookOnShelf ? bookOnShelf.shelf : 'none'
      return bookResult
    })
    return bookResults
  }

  render() {
    const { bookResults, shelvedBooks } = this.state
    const { handleShelfUpdate, handleSearchResults } = this
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              books={bookResults}
              handleShelfUpdate={handleShelfUpdate}
              handleSearchResults={handleSearchResults}
            />
          )}
        />

        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              books={shelvedBooks}
              handleShelfUpdate={handleShelfUpdate}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp