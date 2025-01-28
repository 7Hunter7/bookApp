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
      text="Добавить книгу"
      icon="/icons/file-plus.svg"
      @click="$emit('open-add-modal')"
      :disabled="!isFormValid"
    />
  </div>
  <div class="book-list-header-sort">
    <h2>Сортировка книг</h2>
    <div class="sort-buttons">
      <button @click="setSortField('title')" :class="{ active: sortField === 'title' }">
        Название
      </button>
      <button @click="setSortField('author')" :class="{ active: sortField === 'author' }">
        Автор
      </button>
      <button @click="setSortField('year')" :class="{ active: sortField === 'year' }">Год</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useBookStore } from '@/stores/bookStore'
import ButtonWithIcon from '@/components/ButtonWithIcon.vue'

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
  disabled: {
    type: Boolean,
    default: false,
  },
})
const sortField = computed(() => bookStore.sortField)
const emit = defineEmits(['open-add-modal'])

const setSortField = (field) => {
  bookStore.setSortField(field)
}
</script>

<style lang="scss" scoped>
.book-list-header,
.book-list-header-sort {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2.5rem;
  background-color: var(--light-grey-color);
}
.book-list-header-sort {
  padding: 0.5rem 2.5rem;
}
.sort-buttons {
  display: flex;
  gap: 1rem;
  button {
    background-color: transparent;
    color: var(--primary-color);
    border: none;
    cursor: pointer;
    padding: 0.3rem 0.75rem;
    border-bottom: 2px solid transparent;
    transition: border-bottom 0.3s ease-in-out;
    &.active {
      border-bottom: 2px solid var(--primary-color);
    }
  }
}
</style>
