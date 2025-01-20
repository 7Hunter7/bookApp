<template>
  <form class="book-form" @submit.prevent="submitForm">
    <div class="book-form-content">
      <h3>Добавить книгу</h3>
      <p>Заполните все поля и добавьте книгу в список</p>
    </div>
    <div>
      <label for="title">Название</label>
      <input
        type="text"
        id="title"
        v-model="newBook.title"
        placeholder="Название произведения"
        required
      />
    </div>
    <div>
      <label for="author">Автор</label>
      <input
        type="text"
        id="author"
        v-model="newBook.author"
        placeholder="Имя и фамилия автора"
        required
      />
    </div>
    <div>
      <label for="year">Год</label>
      <input type="number" id="year" v-model.number="newBook.year" placeholder="Год выпуска" />
    </div>
    <div>
      <label for="genre">Жанр</label>
      <input
        type="text"
        id="genre"
        v-model="newBook.genre"
        placeholder="Добавьте жанр произведения"
      />
    </div>
    <div>
      <label>
        <input type="checkbox" v-model="isAgreed" />
        Я согласен с условиями
        <a href="/privacy-policy" target="_blank">Политики конфиденциальности</a>
      </label>
    </div>
    <button type="submit">Добавить</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const newBook = ref({
  title: '',
  author: '',
  year: null,
  genre: '',
})

const isAgreed = ref(false)

const emit = defineEmits(['book-added'])

const submitForm = () => {
  if (!isAgreed.value) {
    alert('Для добавления книги нужно согласиться с политикой конфиденциальности')
    return
  }

  if (newBook.value.title && newBook.value.author) {
    if (newBook.value.year && newBook.value.year > new Date().getFullYear()) {
      alert('Год не может быть больше текущего')
      return
    }
    emit('book-added', { ...newBook.value })
    newBook.value = { title: '', author: '', year: null, genre: '' }
  } else {
    alert('Название и автор обязательны для заполнения!')
  }
}
</script>

<style lang="scss" scoped>
.book-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #2a2a2a;
  border-radius: 8px;

  div {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 5px;
    color: #fff;
  }

  input,
  select {
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #444;
    color: #fff;
  }

  button {
    padding: 12px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
  button:hover {
    background-color: var(--success-color);
  }
}
</style>
