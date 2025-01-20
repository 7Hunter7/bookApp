<template>
  <ul class="book-list">
    <BookItem v-for="book in books" :key="book.title" :book="book" />
  </ul>
</template>

<script setup>
import BookItem from '@/components/BookItem.vue'

defineProps({
  books: {
    type: Array,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.book-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: stretch;
  gap: 20px;
}
</style>
