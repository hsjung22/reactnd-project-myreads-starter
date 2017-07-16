import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DebounceInput from 'react-debounce-input';
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
  state = {
    query: ''
  }

  bookSearchCall = (query) => {
    query
      ? BooksAPI.search(query).then(books => {
          books.error
            ? this.props.handleSearchResults(books.items)
            : this.props.handleSearchResults(books)
        })
      : this.props.handleSearchResults([])
  }


  updateQuery = (query) => {
    // remove leading spaces from query
    query = query.replace(/^ +/gm, '')
    this.setState({ query })
    this.bookSearchCall(query)
  }

  render() {
    const { query } = this.state
    const { handleShelfUpdate, books } = this.props
    const bookResults = query ? books : []

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              debounceTimeout={300}
              className="search-books"
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => this.updateQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {bookResults.map((book, index) =>
              <li key={index}>
                <Book
                  book={book}
                  handleShelfUpdate={handleShelfUpdate}
                />
              </li>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
