<template>
  <li class="book-item">
    <div class="book-item-content">
      <h3>{{ book.title }}</h3>
      <div class="book-item-description">
        <p>Автор: {{ book.author }}</p>
        <p>Год: {{ book.year }}</p>
        <p>Жанр: {{ book.genre }}</p>
      </div>
    </div>
    <div class="book-item-actions">
      <button @click="editBook">
        <img :src="Edit" alt="Edit" />
      </button>
      <button @click="deleteBook">
        <img :src="Delete" alt="Delete" />
      </button>
    </div>
  </li>
</template>

<script setup>
import Edit from '/file-edit.svg'
import Delete from '/trash.svg'

defineProps({
  book: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['edit-book', 'delete-book'])

const editBook = () => {
  emit('edit-book')
}
const deleteBook = () => {
  emit('delete-book')
}
</script>

<style lang="scss" scoped>
.book-item {
  background-color: #f0f0f0;
  margin-top: 16px;
  margin-bottom: 16px;
  padding: 16px;
  border: 2px solid var(--f7f8fa);
  border-radius: 16px;
  flex-basis: calc(33.33% - 20px);
}
.book-item h3 {
  margin-top: 0;
  margin-bottom: 8px;
}
.book-item-description {
  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 16px;
}
.book-item-actions {
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 16px;
}

@media (max-width: 768px) {
  .book-item {
    flex-basis: calc(50% - 20px);
  }
}
@media (max-width: 576px) {
  .book-item {
    flex-basis: 100%;
  }
}
</style>
