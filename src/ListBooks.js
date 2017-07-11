import React from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'

function ListBooks(props) {
  const { books, handleShelfUpdate } = props
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

export default ListBooks