<template>
  <section class="search-input">
    <Icon name="search" />
    <input
      type="text"
      placeholder="Найти ту самую книгу"
      v-model="searchQuery"
      @input="handleInput"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import Icon from './Icon.vue'

const searchQuery = ref('')

const emit = defineEmits(['search'])

const handleInput = () => {
  emit('search', searchQuery.value)
}
</script>

<style lang="scss" scoped>
.search-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 25px;
  margin-top: 16px;
  margin-bottom: 16px;
}
img {
  max-width: 10%;
}
input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}
input:focus {
  background-color: var(--light-grey-color);
  outline: none;
}

input::before {
  content: '';
  border-image: url('/search.svg');
  background-repeat: no-repeat;
  background-position: center;
}
</style>
