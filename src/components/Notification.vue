<template>
  <div v-if="isVisible" :class="['notification', type]">
    <span class="notification-text">{{ message }}</span>
    <button class="close-button" @click="closeNotification">
      <img :src="Close" alt="close" />
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Close from '/icons/close-grey.svg'

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error'].includes(value),
  },
})
const isVisible = ref(true)

const emit = defineEmits(['close'])
onMounted(() => {
  setTimeout(() => {
    closeNotification()
  }, 3000)
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
  padding: 10px 15px;
  border-radius: 4px;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  min-width: 300px;
}

.notification-text {
  color: white;
  flex-grow: 1;
}

.success {
  background-color: #28a745;
}
.error {
  background-color: #dc3545;
}

.close-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
</style>
