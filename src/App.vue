<template>
  <div class="app">
    <h1>Список Книг</h1>
    <SearchInput @search="handleSearch" />
    <BookListHeader
      @open-add-modal="openAddModal"
      :bookCount="filteredBooks.length"
      :searchQuery="bookStore.searchQuery"
    />
    <BookList :books="filteredBooks" @edit-book="openEditModal" />
    <Modal :isOpen="isModalOpen" @close="closeModal" :title="modalTitle" width="35rem">
      <BookModalForm
        :isOpen="isModalOpen"
        :book="currentBook"
        :mode="mode"
        @add="addBook"
        @edit="editBook"
        @delete="deleteBook"
        @close="closeModal"
        @update:isFormValid="isBookModalFormValid = $event"
        @validation-error="showValidationError"
      />
    </Modal>

    <Modal
      :isOpen="isDeleteModalOpen"
      title="Подтверждение удаления"
      @close="closeDeleteModal"
      width="35rem"
    >
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
import { ref, computed, onMounted } from 'vue'
import { useBookStore } from '@/stores/bookStore'
import BookList from '@/views/BookList.vue'
import BookListHeader from '@/components/BookListHeader.vue'
import BookModalForm from '@/components/BookModalForm.vue'
import SearchInput from '@/components/SearchInput.vue'
import Modal from '@/components/Modal.vue'
import Notification from '@/components/Notification.vue'

const bookStore = useBookStore()

onMounted(() => {
  bookStore.initializeStore() // Загрузка данных из localStorage
})

const filteredBooks = computed(() => bookStore.filteredBooks)
const isModalOpen = computed(() => bookStore.isModalOpen)
const isDeleteModalOpen = computed(() => bookStore.isDeleteModalOpen)
const mode = ref('add')
const currentBook = computed(() => bookStore.currentBook)
const notification = computed(() => bookStore.notification)
const isBookModalFormValid = ref(true)
const modalTitle = computed(() =>
  mode.value === 'edit' ? 'Редактирование книги' : 'Добавить книгу',
)

const handleSearch = (query) => {
  bookStore.setSearchQuery(query)
}

const openAddModal = () => {
  console.log('Запуск openAddModal')
  bookStore.openAddModal()
  isBookModalFormValid.value = false
}

const openEditModal = (book) => {
  console.log('Запуск openEditModal')
  mode.value = 'edit'
  bookStore.currentBook = { ...book }
  bookStore.isModalOpen = true
  isBookModalFormValid.value = true
}

const closeModal = () => {
  bookStore.closeModal()
}

const closeDeleteModal = () => {
  bookStore.closeDeleteModal()
}

const addBook = (book) => {
  bookStore.addBook(book)
  bookStore.closeModal()
}

const editBook = (book) => {
  bookStore.editBook(book)
}

const deleteBook = (bookId) => {
  bookStore.deleteBook(bookId)
}

const confirmDelete = () => {
  bookStore.confirmDelete()
}

const closeNotification = () => {
  bookStore.closeNotification()
}

const showValidationError = (message) => {
  bookStore.showError(message)
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
