import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
  state = {
    books: [],
    query: ''
  }

  updateQuery = (query) => {
    const trimQuery = query.trim()

    this.setState({ query: trimQuery })

    if(trimQuery) {
      BooksAPI.search(trimQuery).then(books => {
        books.error
          ? this.setState({ books: books.items })
          : this.setState({ books: books })
      })
    }
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
    const { query } = this.state

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
            <input
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
            {this.state.books.map(book => 
              <li key={book.id}>
                <Book
                  book={book}
                  handleShelfUpdate={this.handleShelfUpdate}
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