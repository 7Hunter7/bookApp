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
    <div class="policy">
      <label>
        <input type="checkbox" v-model="isAgreed" />
        Я согласен с условиями
        <a href="/privacy-policy" target="_blank">Политики конфиденциальности</a>
      </label>
    </div>
    <div class="button-submit">
      <ButtonWithIcon
        type="submit"
        icon="/icons/file-plus.svg"
        text="Добавить"
        buttonStyle="success"
      />
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import ButtonWithIcon from '@/components/ButtonWithIcon.vue'

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
.book-form-content {
  margin: 0rem;
}
.book-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border: 2px solid var(--light-grey-color);
  border-radius: var(--border-radius);
  max-width: 29rem;
  max-height: 31.3125rem;
}
div {
  display: flex;
  flex-direction: column;
}
h3 {
  margin: 0rem;
}
p {
  margin-top: 0.5rem;
}
label {
  font-weight: bold;
  margin-bottom: 0.25rem;
}
input,
select {
  padding: 0.625rem;
  border: none;
  border-radius: 0.25rem;
  background-color: var(--light-grey-color);
}
.button-submit {
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
}
.policy {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}
.policy label {
  font-weight: normal;
  font-size: 0.625rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
}
.policy label a {
  margin-left: -0.25rem;
}
// Стили для кастомного чекбокса
.policy input[type='checkbox'] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid var(--secondary-color);
  border-radius: 0.5rem;
  cursor: pointer;
  position: relative;
}

.policy input[type='checkbox']:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 1.25rem;
  height: 1.25rem;
  background-image: url('/icons/checkbox-checked.svg');
  background-position: center;
  border-radius: 0.25rem;
  transition: transform 0.2s ease-in-out;
}
.policy input[type='checkbox']:checked:before {
  transform: translate(-50%, -50%) scale(1);
}
.button-submit {
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
}
</style>
