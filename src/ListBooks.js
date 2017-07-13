import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {
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

  render () {
    const { books } = this.state
    const { handleShelfUpdate } = this

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              shelf="Currently Reading"
              handleShelfUpdate={handleShelfUpdate}
              books={books.filter(book =>
                book.shelf === "currentlyReading"
              )}
            />
            <Bookshelf
              shelf="Want to Read"
              handleShelfUpdate={handleShelfUpdate}
              books={books.filter(book =>
                book.shelf === "wantToRead"
              )}
            />
            <Bookshelf
              shelf="Read"
              handleShelfUpdate={handleShelfUpdate}
              books={books.filter(book =>
                book.shelf === "read"
              )}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            Add a book
          </Link>
        </div>
      </div> 
    )
  }
}

export default ListBooks