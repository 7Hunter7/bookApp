<template>
  <div class="app">
    <h1>Список Книг</h1>
    <SearchInput @search="handleSearch" />
    <BookList :books="filteredBooks" @edit-book="openEditModal" @delete-book="openDeleteModal" />
    <BookForm @book-added="handleBookAdded" />
    <Modal :isOpen="isModalOpen" title="Редактирование книги" @close="closeModal">
      <template #header>
        <h2>Редактирование книги</h2>
      </template>
      <form v-if="currentBook" class="book-form modal-book-form" @submit.prevent="saveBook">
        <div>
          <label for="title">Название</label>
          <input type="text" id="title" v-model="currentBook.title" required />
        </div>
        <div>
          <label for="author">Автор</label>
          <input type="text" id="author" v-model="currentBook.author" required />
        </div>
        <div>
          <label for="year">Год</label>
          <input type="number" id="year" v-model.number="currentBook.year" />
        </div>
        <div>
          <label for="genre">Жанр</label>
          <input type="text" id="genre" v-model="currentBook.genre" />
        </div>
        <div class="modal-actions">
          <ButtonWithIcon
            type="submit"
            icon="/icons/file-check.svg"
            text="Сохранить"
            buttonStyle="success"
            @click="saveBook"
          />
          <ButtonWithIcon
            type="submit"
            icon="/icons/trash.svg"
            buttonStyle="errors"
            @click="deleteBook"
          />
          <div class="checkbox">
            <input type="checkbox" id="confirm" v-model="agreed" />
            <label for="confirm"
              >Я согласен с условиями <a href="#">Политики конфиденциальности</a></label
            >
          </div>
        </div>
      </form>
    </Modal>

    <Modal :isOpen="isDeleteModalOpen" title="Подтверждение удаления" @close="closeDeleteModal">
      <template #header>
        <h2>Подтверждение удаления</h2>
      </template>
      <p>Вы действительно хотите удалить книгу "{{ currentBook?.title }}"?</p>
      <div class="modal-actions">
        <button class="confirm-delete-button" @click="confirmDelete">Да</button>
        <button @click="closeDeleteModal">Нет</button>
      </div>
    </Modal>

    <Notification
      v-if="notification.message"
      :message="notification.message"
      :type="notification.type"
      @close="closeNotification"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BookList from '@/views/BookList.vue'
import BookForm from '@/components/BookForm.vue'
import SearchInput from '@/components/SearchInput.vue'
import Modal from '@/components/Modal.vue'
import ButtonWithIcon from '@/components/ButtonWithIcon.vue'
import Notification from './components/Notification.vue'

const books = ref([
  {
    title: 'Как разговаривать с кем угодно, когда угодно, где угодно',
    author: 'Ларри Кинг',
    year: 2011,
    genre: 'Научпоп',
  },
  {
    title: 'Больше, чем просто красивая. 12 тайных сил женщины, перед которой невозможно устоять',
    author: 'Кара Кинг',
    year: 2020,
    genre: 'Научпоп',
  },
  {
    title:
      'Искусство системного мышления. Необходимые знания о системах и творческом подходе к решению проблем',
    author: "Джозеф О'Коннор и Иан Макдермотт",
    year: 2018,
    genre: 'Научпоп',
  },
])

const searchQuery = ref('')
const isModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const currentBook = ref(null)
const agreed = ref(false)
const notification = ref({ message: '', type: '' })

const filteredBooks = computed(() => {
  if (!searchQuery.value) {
    return books.value
  }
  return books.value.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const handleBookAdded = (newBook) => {
  books.value.push(newBook)
  showSuccess('Книга добавлена в список')
}

const handleSearch = (query) => {
  searchQuery.value = query
}

const openEditModal = (book) => {
  currentBook.value = book
  isModalOpen.value = true
  agreed.value = false
}

const openDeleteModal = (book) => {
  currentBook.value = book
  isDeleteModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  currentBook.value = null
}

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false
  currentBook.value = null
}

const saveBook = () => {
  if (!agreed.value) {
    showError('Необходимо принять условия')
    return
  }
  const index = books.value.findIndex((book) => book.title === currentBook.value.title)
  if (index !== -1) {
    books.value[index] = { ...currentBook.value }
  }
  closeModal()
  showSuccess('Книга изменена')
}

const deleteBook = () => {
  isModalOpen.value = false
  isDeleteModalOpen.value = true
}

const confirmDelete = () => {
  const index = books.value.findIndex((book) => book.title === currentBook.value.title)
  if (index !== -1) {
    books.value.splice(index, 1)
  }
  closeDeleteModal()
  showSuccess('Книга удалена')
}

const showSuccess = (message) => {
  notification.value = { message, type: 'success' }
}
const showError = (message) => {
  notification.value = { message, type: 'error' }
}
const closeNotification = () => {
  notification.value = { message: '', type: '' }
}
</script>

<style lang="scss">
h1 {
  text-align: center;
  margin-bottom: 20px;
}

.modal-book-form {
  padding: 0;
  background-color: transparent;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  align-items: center;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 5px;
  input {
    width: 20px;
    height: 20px;
  }
}
</style>
