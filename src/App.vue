<template>
  <div class="app">
    <h1>Список Книг</h1>
    <SearchInput @search="handleSearch" />
    <BookList :books="filteredBooks" />
    <BookForm @book-added="handleBookAdded" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BookList from '@/views/BookList.vue'
import BookForm from '@/components/BookForm.vue'
import SearchInput from '@/components/SearchInput.vue'

const books = ref([
  {
    title: 'Как разговаривать с кем угодно, когда угодно, где угодно',
    author: 'Ларри Кинг',
    year: 2011,
    genre: 'Научпоп',
  },
  {
    title: 'Больше, чем просто красивая. 12 тайных сил женщины, перед которой невозможно устоять',
    author: 'Кара Кинг',
    year: 2020,
    genre: 'Научпоп',
  },
  {
    title:
      'Искусство системного мышления. Необходимые знания о системах и творческом подходе к решению проблем',
    author: "Джозеф О'Коннор и Иан Макдермотт",
    year: 2018,
    genre: 'Научпоп',
  },
])

const searchQuery = ref('')

const filteredBooks = computed(() => {
  if (!searchQuery.value) {
    return books.value
  }
  return books.value.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const handleBookAdded = (newBook) => {
  books.value.push(newBook)
}

const handleSearch = (query) => {
  searchQuery.value = query
}
</script>

<style lang="scss">
.app {
  background-color: #1a1a1a;
  color: #fff;
  font-family: sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
