<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal" :style="{ maxWidth: width }">
      <div class="modal-header">
        <slot name="header">
          <h2>{{ title }}</h2>
        </slot>
        <button class="close-button" @click="$emit('close')">
          <img :src="Close" alt="close" />
        </button>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import Close from '/icons/close-grey.svg'

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Модальное окно',
  },
  width: {
    type: String,
    default: '600px',
  },
})

defineEmits(['close'])
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: var(--background-color);
  padding: 20px;
  border-radius: 8px;
  width: 100%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.close-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
</style>
