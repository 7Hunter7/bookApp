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
            @click="() => openDeleteModal(currentBook.id)"
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
import { useBookStore } from '@/stores/bookStore'
import BookList from '@/views/BookList.vue'
import BookModalForm from '@/components/BookModalForm.vue'
import SearchInput from '@/components/SearchInput.vue'
import Modal from '@/components/Modal.vue'
import ButtonWithIcon from '@/components/ButtonWithIcon.vue'
import Notification from './components/Notification.vue'

const bookStore = useBookStore()

bookStore.initializeStore() // Загрузка данных из localStorage

const filteredBooks = computed(() => bookStore.filteredBooks)
const isModalOpen = computed(() => bookStore.isModalOpen)
const isDeleteModalOpen = computed(() => bookStore.isDeleteModalOpen)
const mode = ref('add')
const currentBook = computed(() => bookStore.currentBook)
const notification = computed(() => bookStore.notification)

const handleBookSubmit = (book) => {
  if (mode.value === 'add') {
    bookStore.addBook(book)
  } else {
    bookStore.updateBook(book)
  }
}

const handleSearch = (query) => {
  bookStore.setSearchQuery(query)
}

const openAddModal = () => {
  bookStore.openAddModal()
}

const openEditModal = (book) => {
  bookStore.editBook(book)
}

const openDeleteModal = (bookId) => {
  bookStore.deleteBook(bookId)
}

const closeModal = () => {
  bookStore.closeModal()
}

const closeDeleteModal = () => {
  bookStore.closeDeleteModal()
}

const saveBook = () => {
  bookStore.updateBook(currentBook.value)
}

const confirmDelete = () => {
  bookStore.confirmDelete()
}

const closeNotification = () => {
  bookStore.closeNotification()
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
