<template>
  <li class="book-item">
    <div class="book-item-content">
      <h3>{{ book.title }}</h3>
      <div class="book-item-description">
        <p>{{ book.author }}</p>
        <p>{{ book.year }}</p>
        <p>{{ book.genre }}</p>
      </div>
    </div>
    <div class="book-item-actions">
      <!-- <button @click="deleteBook">
        <img :src="Delete" alt="Delete" />
      </button> -->
      <button @click="editBook">
        <img :src="Edit" alt="Edit" />
      </button>
    </div>
  </li>
</template>

<script setup>
import Edit from '/icons/file-edit.svg'
// import Delete from '/icons/trash.svg'

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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: var(--padding-medium);
  border: 2px solid var(--light-grey-color);
  border-radius: var(--border-radius);
  flex-basis: calc(33.33% - 20px);
  max-height: 5rem;
}
.book-item:hover {
  background-color: var(--light-grey-color);
}

.book-item h3 {
  margin-top: 0;
  margin-bottom: 8px;
}
.book-item-description {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 1rem;
  max-height: 1.3rem;
}
.book-item-actions {
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 1rem;
}
button {
  border: none;
  background-color: var(--background-color);
}
.book-item:hover button {
  background-color: var(--light-grey-color);
}
button:hover svg {
  fill: var(--error-color);
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
