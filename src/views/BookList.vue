<template>
  <ul class="book-list">
    <BookItem
      v-for="book in books"
      :key="book.id"
      :book="book"
      @edit-book="$emit('edit-book', book)"
    />
  </ul>
</template>

<script setup>
import { computed } from 'vue'
import BookItem from '@/components/BookItem.vue'
import { useBookStore } from '@/stores/bookStore'

const bookStore = useBookStore()

const books = computed(() => bookStore.filteredBooks)

const emit = defineEmits(['edit-book'])
</script>

<style lang="scss" scoped>
.book-list {
  list-style: none;
  padding: 1rem 2.5rem;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: stretch;
  gap: 1rem;
}
</style>
