<template>
  <div v-if="isVisible" :class="['notification', type]">
    <span class="notification-text">{{ message }}</span>
    <div v-if="showButtons" class="notification-actions">
      <button class="confirm-button" @click="confirmAction">Да</button>
      <button class="cancel-button" @click="closeNotification">Нет</button>
    </div>
    <button v-else class="close-button" @click="closeNotification">
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
      closeNotification()
    }, 3000)
  }
})

const closeNotification = () => {
  isVisible.value = false
  emit('close')
}
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
}
.notification-text {
  font-weight: 400;
  font-size: 1rem;
  line-height: 150%;
  text-align: center;
  color: var(--background-color);
}
.success,
.error {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-size: 1.25rem 12.25rem contain;
  background-repeat: no-repeat;
  background-position: 0.5rem;
}
.success::before {
  background-image: url(/icons/file-plus.svg);
  background-color: var(--success-color);
}
.error {
  background-image: url(/icons/file-x.svg);
  background-color: var(--error-color);
}
</style>
