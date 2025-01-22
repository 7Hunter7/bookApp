<template>
  <div class="book-list-header">
    <div v-if="searchQuery" class="book-list-header-text">
      <h2>
        Книги по запросу <span>«{{ searchQuery }}»</span>
      </h2>
    </div>
    <div v-else class="book-list-header-text">
      <h2>
        Книги в каталоге <span> {{ bookCount }}</span>
      </h2>
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
  bookCount: {
    type: Number,
    required: true,
  },
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
  padding: 1rem 2.5rem;
  background-color: var(--light-grey-color);
}
</style>
