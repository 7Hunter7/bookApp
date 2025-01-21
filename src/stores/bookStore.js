import { defineStore } from 'pinia'

export const useBookStore = defineStore('book', {
  state: () => ({
    books: [],
    searchQuery: '',
    isModalOpen: false,
    isDeleteModalOpen: false,
    isAddModalOpen: false,
    currentBook: null,
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
      this.books.push(newBook)
      this.saveBooksToLocalStorage()
      this.showSuccess('Книга добавлена')
    },
    editBook(book) {
      this.currentBook = book
      this.isModalOpen = true
    },
    deleteBook() {
      this.isModalOpen = false
      this.isDeleteModalOpen = true
    },
    confirmDelete() {
      const index = this.books.findIndex((book) => book.title === this.currentBook.title)
      if (index !== -1) {
        this.books.splice(index, 1)
      }
      this.closeDeleteModal()
      this.saveBooksToLocalStorage()
      this.showSuccess('Книга удалена')
    },
    updateBook(updatedBook) {
      const index = this.books.findIndex((book) => book.title === updatedBook.title)
      if (index !== -1) {
        this.books[index] = { ...updatedBook }
      }
      this.closeModal()
      this.saveBooksToLocalStorage()
      this.showSuccess('Книга изменена')
    },
    closeModal() {
      this.isModalOpen = false
      this.currentBook = null
    },
    closeDeleteModal() {
      this.isDeleteModalOpen = false
      this.currentBook = null
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
