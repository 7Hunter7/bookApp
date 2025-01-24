<template>
  <div class="modal-overlay">
    <form class="book-form" @submit.prevent="submitForm">
      <div class="book-form-content">
        <div class="book-form-description">
          <h3>{{ formTitle }}</h3>
          <p>{{ formDescription }}</p>
        </div>
        <button class="close-button" @click="closeForm">
          <img :src="Close" alt="close" />
        </button>
      </div>
      <div>
        <label for="title">Название</label>
        <input
          type="text"
          id="title"
          v-model="currentBook.title"
          placeholder="Название произведения"
          required
        />
      </div>
      <div>
        <label for="author">Автор</label>
        <input
          type="text"
          id="author"
          v-model="currentBook.author"
          placeholder="Имя и фамилия автора"
          required
        />
      </div>
      <div>
        <label for="year">Год</label>
        <input
          type="number"
          id="year"
          v-model.number="currentBook.year"
          placeholder="Год выпуска"
        />
      </div>
      <div>
        <label for="genre">Жанр</label>
        <input
          type="text"
          id="genre"
          v-model="currentBook.genre"
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

      <!-- Кнопка для добавления -->
      <div v-if="mode === 'add'" class="modal-actions">
        <ButtonWithIcon
          type="submit"
          icon="/icons/file-plus.svg"
          text="Добавить"
          buttonStyle="success"
          :disabled="!isFormValid"
          @click="addBook"
        />
      </div>
      <!-- Кнопки для редактирования -->
      <div v-else class="modal-actions">
        <ButtonWithIcon
          type="button"
          icon="/icons/file-check.svg"
          text="Сохранить"
          buttonStyle="success"
          :disabled="!isFormValid"
          @click="saveBook"
        />
        <ButtonWithIcon
          type="button"
          icon="/icons/trash.svg"
          buttonStyle="default"
          @click="deleteBook"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import Close from '/icons/close-grey.svg'
import ButtonWithIcon from '@/components/ButtonWithIcon.vue'

const props = defineProps({
  book: {
    type: Object,
    default: () => ({
      id: '',
      title: '',
      author: '',
      year: null,
      genre: '',
    }),
  },
  mode: {
    type: String,
    default: 'add',
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const isAgreed = ref(false)
const currentBook = ref({ ...props.book })

const emit = defineEmits([
  'add',
  'edit',
  'delete',
  'close',
  'update:isFormValid',
  'show-delete-notification',
])

const formTitle = computed(() =>
  props.mode === 'edit' ? 'Редактирование книги' : 'Добавить книгу',
)
const formDescription = computed(() =>
  props.mode === 'edit'
    ? 'Внесите изменения в карточке'
    : 'Заполните все поля и добавьте книгу в список',
)

const isFormValid = computed(() => {
  return (
    currentBook.value.title &&
    currentBook.value.title.trim() &&
    currentBook.value.author &&
    currentBook.value.author.trim() &&
    currentBook.value.year !== null &&
    !isNaN(currentBook.value.year) &&
    parseInt(currentBook.value.year) > 0 &&
    currentBook.value.year <= new Date().getFullYear() &&
    isAgreed.value
  )
})

const submitForm = () => {
  if (isFormValid.value) {
  } else {
    emit('update:isFormValid', false)
    emit(
      'validation-error',
      'Необходимо принять условия политики конфиденциальности и проверить корректность данных',
    )
  }
}

const addBook = () => {
  if (isFormValid.value) {
    emit('add', currentBook.value)
  } else {
    emit('update:isFormValid', false)
    emit(
      'validation-error',
      'Необходимо принять условия политики конфиденциальности и проверить корректность данных',
    )
  }
}

const saveBook = () => {
  if (isFormValid.value) {
    emit('edit', currentBook.value)
  } else {
    emit('update:isFormValid', false)
    emit(
      'validation-error',
      'Необходимо принять условия политики конфиденциальности и проверить корректность данных',
    )
  }
}

const deleteBook = () => {
  emit('show-delete-notification', { ...currentBook.value })
}

const closeForm = () => {
  emit('close')
}

watch(
  () => props.book,
  (newVal) => {
    currentBook.value = { ...newVal }
  },
)

watch(isFormValid, (newVal) => {
  emit('update:isFormValid', newVal)
})
</script>

<style lang="scss" scoped>
.book-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border: 2px solid var(--light-grey-color);
  border-radius: var(--border-radius);
  background-color: var(--background-color);
  width: 29rem;
}
.book-form-content {
  margin: 0rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
.book-form-description {
  display: flex;
  flex-direction: column;
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
.modal-actions {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
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
</style>
