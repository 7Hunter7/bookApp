import { defineStore } from 'pinia'

export const useBookStore = defineStore('book', {
  state: () => ({
    books: [],
    searchQuery: '',
    isModalOpen: false,
    isDeleteModalOpen: false,
    isAddModalOpen: false,
    currentBook: {}, // Инициализация пустым объектом
    notification: { message: '', type: '' },
  }),
  getters: {
    filteredBooks: (state) => {
      if (!state.searchQuery) {
        return state.books
      }
      return state.books.filter((book) =>
        book.title.toLowerCase().includes(state.searchQuery.toLowerCase()),
      )
    },
  },
  actions: {
    initializeStore() {
      const storedBooks = localStorage.getItem('books')
      if (storedBooks) {
        this.books = JSON.parse(storedBooks)
      }
    },
    addBook(newBook) {
      // Валидация данных
      if (
        !newBook.title ||
        !newBook.author ||
        !/^\d{4}$/.test(newBook.year) ||
        parseInt(newBook.year) > new Date().getFullYear()
      ) {
        this.showError('Некорректные данные')
        return
      }
      this.books.push(newBook)
      this.saveBooksToLocalStorage()
      this.showSuccess('Книга добавлена')
    },
    editBook(book) {
      Object.assign(this.currentBook, book)
      this.isModalOpen = true
    },
    deleteBook(bookId) {
      // Принимаем ID книги
      this.isModalOpen = false
      this.isDeleteModalOpen = true
      this.currentBook = this.books.find((book) => book.id === bookId) // Ищем книгу по ID
    },
    confirmDelete() {
      const index = this.books.findIndex((book) => book.id === this.currentBook.id)
      if (index !== -1) {
        this.books.splice(index, 1)
      }
      this.closeDeleteModal()
      this.saveBooksToLocalStorage()
      this.showSuccess('Книга удалена')
    },
    updateBook(updatedBook) {
      const index = this.books.findIndex((book) => book.id === updatedBook.id)
      if (index !== -1) {
        Object.assign(this.books[index], updatedBook) // Более эффективный способ обновления
      }
      this.closeModal()
      this.saveBooksToLocalStorage()
      this.showSuccess('Книга изменена')
    },
    closeModal() {
      this.isModalOpen = false
      this.currentBook = {} // Очищаем currentBook
    },
    closeDeleteModal() {
      this.isDeleteModalOpen = false
      this.currentBook = {}
    },
    openAddModal() {
      this.isAddModalOpen = true
    },
    closeAddModal() {
      this.isAddModalOpen = false
    },
    setSearchQuery(query) {
      this.searchQuery = query
    },
    showSuccess(message) {
      this.notification = { message, type: 'success' }
      setTimeout(() => {
        this.closeNotification()
      }, 3000)
    },
    showError(message) {
      this.notification = { message, type: 'error' }
      setTimeout(() => {
        this.closeNotification()
      }, 3000)
    },
    closeNotification() {
      this.notification = { message: '', type: '' }
    },
    saveBooksToLocalStorage() {
      localStorage.setItem('books', JSON.stringify(this.books))
    },
  },
})
