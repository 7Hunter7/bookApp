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
import BookItem from '@/components/BookItem.vue'

defineProps({
  books: {
    type: Array,
    required: true,
  },
})

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
