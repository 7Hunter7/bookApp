// Функция валидации Книг
export function validateBook(book) {
  return (
    book &&
    book.title &&
    book.title.trim() &&
    book.author &&
    book.author.trim() &&
    book.year &&
    !isNaN(book.year) &&
    parseInt(book.year) > 0 &&
    parseInt(book.year) <= new Date().getFullYear()
  )
}
