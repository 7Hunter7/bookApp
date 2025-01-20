<template>
  <section class="search-input">
    <img :src="Icon" alt="Icon" />
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
import Icon from '/icons/Icon.svg'

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
  padding: 1rem 2.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: var(--light-grey-color);
}
img {
  max-width: 10%;
}
input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 2px solid var(--light-grey-color);
  transition: border 0.3s ease;
  background-image: url('/icons/search.svg');
  background-repeat: no-repeat;
  background-position: 0.75rem center;
  padding-left: 2.25rem;
}

input:focus {
  border: 2px solid var(--grey-color);
  outline: none;
}
</style>
