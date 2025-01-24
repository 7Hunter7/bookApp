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
    <div class="sort-buttons">
      <button @click="setSortField('title')" :class="{ active: sortField === 'title' }">
        Название
      </button>
      <button @click="setSortField('author')" :class="{ active: sortField === 'author' }">
        Автор
      </button>
      <button @click="setSortField('year')" :class="{ active: sortField === 'year' }">Год</button>
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
import { useBookStore } from '@/stores/bookStore'
import { computed } from 'vue'

const bookStore = useBookStore()

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
const sortField = computed(() => bookStore.sortField)
const emit = defineEmits(['open-add-modal'])

const setSortField = (field) => {
  bookStore.setSortField(field)
}
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
.sort-buttons {
  display: flex;
  gap: 10px;
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 5px 10px;
    border-bottom: 2px solid transparent;
    transition: border-bottom 0.3s ease;
    &.active {
      border-bottom: 2px solid var(--primary-color);
    }
  }
}
</style>
