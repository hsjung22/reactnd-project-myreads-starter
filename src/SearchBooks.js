import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
  state = {
    books: [],
    query: ''
  }

  updateQuery = (input) => {
    const query = input.trim()

    this.setState({ query })

    query
      ? BooksAPI.search(query).then(books => {
          books.error
            ? this.setState({ books: books.items })
            : this.setState({ books })
        })
      : this.setState({ books: [] })
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