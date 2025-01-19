<template>
  <input
    type="text"
    placeholder="Найти ту самую книгу"
    v-model="searchQuery"
    @input="handleInput"
  />
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')

const emit = defineEmits(['search'])

const handleInput = () => {
  emit('search', searchQuery.value)
}
</script>

<style lang="scss" scoped>
input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  width: 100%;
}
</style>
