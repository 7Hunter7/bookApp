<template>
  <div v-if="isVisible" :class="['notification', type]">
    <span class="notification-text">{{ message }}</span>
    <div v-if="showButtons" class="notification-actions">
      <button class="confirm-button" @click="confirmAction">Да</button>
      <button class="cancel-button" @click="$emit('close')">Нет</button>
    </div>
    <button v-else class="close-button" @click="$emit('close')">
      <img :src="Close" alt="close" />
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Close from '/icons/close-white.svg'

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'confirm'].includes(value),
  },
  showButtons: {
    type: Boolean,
    default: false,
  },
  confirmAction: {
    type: Function,
    default: null,
  },
})
const isVisible = ref(true)

const emit = defineEmits(['close'])
onMounted(() => {
  if (props.type !== 'confirm') {
    setTimeout(() => {
      emit('close')
    }, 3000)
  }
})

// const closeNotification = () => {
//   isVisible.value = false
//   emit('close')
// }
</script>

<style lang="scss" scoped>
.notification {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius-small);
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  min-width: 16rem;
  &.confirm {
    background-color: var(--error-color);
    color: var(--background-color);
    flex-direction: column;
  }
  &.success {
    background-color: var(--success-color);
    color: var(--background-color);
  }
  &.error {
    background-color: var(--error-color);
    color: var(--background-color);
  }
}
.notification-actions {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 0.5rem;
}
.notification-text {
  text-align: center;
}
</style>
