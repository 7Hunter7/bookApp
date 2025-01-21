<template>
  <div class="app">
    <h1>Список Книг</h1>
    <SearchInput @search="handleSearch" />
    <ButtonWithIcon
      type="submit"
      :disabled="!isFormValid"
      icon="/icons/file-plus.svg"
      text="Добавить книгу"
      buttonStyle="success"
      @click="openAddModal"
    />
    <BookList :books="filteredBooks" @edit-book="openEditModal" />
    <Modal :isOpen="isModalOpen" @close="closeModal" :title="modalTitle">
      <BookModalForm :book="currentBook" :mode="mode" @submit="handleBookSubmit" />
      <template v-if="mode === 'edit'">
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
            @click="openDeleteModal"
          />
        </div>
      </template>
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
import BookModalForm from '@/components/BookModalForm.vue'
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
const mode = ref('add')
const currentBook = ref({
  title: '',
  author: '',
  year: null,
  genre: '',
})
const notification = ref({ message: '', type: '' })
const filteredBooks = computed(() => {
  if (!searchQuery.value) {
    return books.value
  }
  return books.value.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})
const modalTitle = computed(() =>
  mode.value === 'edit' ? 'Редактирование книги' : 'Добавить книгу',
)

const handleBookSubmit = (book) => {
  if (mode.value === 'add') {
    handleBookAdded(book)
  }
  closeModal()
}

const handleBookAdded = (newBook) => {
  books.value.push(newBook)
  showSuccess('Книга добавлена в список')
}

const handleSearch = (query) => {
  searchQuery.value = query
}

const openAddModal = () => {
  mode.value = 'add'
  currentBook.value = {
    title: '',
    author: '',
    year: null,
    genre: '',
  }
  isModalOpen.value = true
}

const openEditModal = (book) => {
  mode.value = 'edit'
  currentBook.value = { ...book }
  isModalOpen.value = true
}

const openDeleteModal = () => {
  isModalOpen.value = false
  isDeleteModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  isDeleteModalOpen.value = false
  currentBook.value = {
    title: '',
    author: '',
    year: null,
    genre: '',
  }
}

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false
}

const saveBook = () => {
  const index = books.value.findIndex((book) => book.title === currentBook.value.title)
  if (index !== -1) {
    books.value[index] = { ...currentBook.value }
  }
  closeModal()
  showSuccess('Книга изменена')
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
