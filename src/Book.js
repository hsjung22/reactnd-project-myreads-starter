import React from 'react'

function Book(props) {
  const { book, handleShelfUpdate } = props
  const authors = book.authors
    ? book.authors.map((author, index) =>
        <div
          key={index}
          className="book-authors"
        >
          {author}
        </div>
      )
    : []


  return (
    <div className="book">
      <div className="book-top">
        <div 
          className="book-cover"
          style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}
        />
        <div className="book-shelf-changer">
          <select
            name="shelf"
            value={book.shelf}
            onChange={(e) => handleShelfUpdate(book, e.target.value)}
          >
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {authors}
    </div>
  )
}

export default Book