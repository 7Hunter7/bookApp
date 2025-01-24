import { defineStore } from 'pinia'
import { validateBook } from '../utils/validation'

function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export const useBookStore = defineStore('book', {
  state: () => ({
    books: [
      {
        id: '1',
        title: 'Как разговаривать с кем угодно, когда угодно, где угодно',
        author: 'Ларри Кинг',
        year: 2011,
        genre: 'Научпоп',
      },
      {
        id: '2',
        title:
          'Больше, чем просто красивая. 12 тайных сил женщины, перед которой невозможно устоять',
        author: 'Кара Кинг',
        year: 2020,
        genre: 'Научпоп',
      },
      {
        id: '3',
        title:
          'Искусство системного мышления. Необходимые знания о системах и творческом подходе к решению проблем',
        author: "Джозеф О'Коннор и Иан Макдермотт",
        year: 2018,
        genre: 'Научпоп',
      },
      {
        id: '4',
        title: 'Как разговаривать с кем угодно, когда угодно, где угодно',
        author: 'Ларри Кинг',
        year: 2021,
        genre: 'Научпоп',
      },
    ],
    searchQuery: '',
    isModalOpen: false,
    isDeleteModalOpen: false,
    isAddModalOpen: false,
    currentBook: {},
    notification: { message: '', type: '' },
    sortField: null,
    sortDirection: 'asc', // 'asc' или 'desc'
  }),
  getters: {
    filteredBooks: (state) => {
      let filtered = [...state.books]

      if (state.searchQuery) {
        filtered = filtered.filter((book) =>
          book.title.toLowerCase().includes(state.searchQuery.toLowerCase()),
        )
      }

      if (state.sortField) {
        filtered.sort((a, b) => {
          const aValue = a[state.sortField]
          const bValue = b[state.sortField]

          const comparison =
            typeof aValue === 'number'
              ? aValue - bValue
              : String(aValue).localeCompare(String(bValue))
          return state.sortDirection === 'asc' ? comparison : -comparison
        })
      }
      return filtered
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
      if (!validateBook(newBook)) {
        this.showError('Книга не добавлена')
        this.showError('Некорректные данные книги. Проверьте поля')
        return
      }
      newBook.id = generateId()
      this.books.push(newBook)
      this.saveBooksToLocalStorage()
      this.showSuccess('Книга добавлена в список')
    },
    editBook(updatedBook) {
      const index = this.books.findIndex((book) => book.id === updatedBook.id)
      if (index === -1) {
        this.showError('Книга не найдена')
        return
      }
      if (!validateBook(updatedBook)) {
        this.showError('Некорректные данные книги. Проверьте поля')
        return
      }
      this.books[index] = updatedBook
      this.saveBooksToLocalStorage()
      this.showSuccess('Книга изменена')
    },
    deleteBook(bookId) {
      const index = this.books.findIndex((book) => book.id === bookId)
      if (index !== -1) {
        this.books.splice(index, 1)
        this.saveBooksToLocalStorage()
        this.showSuccess('Книга удалена. Вернуть её')
      } else {
        this.showError('Книга не найдена')
      }
      this.closeModal()
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
      this.isModalOpen = true
      this.mode = 'add'
      this.currentBook = {}
    },
    closeAddModal() {
      this.isModalOpen = false
    },
    setSearchQuery(query) {
      this.searchQuery = query
    },
    setSortField(field) {
      if (this.sortField === field) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortField = field
        this.sortDirection = 'asc'
      }
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
