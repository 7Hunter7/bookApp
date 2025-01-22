<template>
  <div class="book-list-header">
    <div class="book-list-header-text">
      <p v-if="searchQuery">Книги по запросу «{{ searchQuery }}»</p>
      <p v-else>Книги в каталоге</p>
    </div>
    <ButtonWithIcon
      type="submit"
      icon="/icons/file-plus.svg"
      text="Добавить книгу"
      buttonStyle="success"
      @click="$emit('open-add-modal')"
    />
  </div>
</template>

<script setup>
import ButtonWithIcon from '@/components/ButtonWithIcon.vue'

const props = defineProps({
  searchQuery: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['open-add-modal'])
</script>

<style lang="scss" scoped>
.book-list-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 2.5rem;
}
.book-list-header-text {
  display: flex;
  flex-direction: row;
  gap: 1.25rem;
}
.book-list-header-text p {
  margin: 0;
}
</style>
