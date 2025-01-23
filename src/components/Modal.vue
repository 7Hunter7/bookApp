<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal" :style="{ maxWidth: width }">
      <div class="modal-header">
        <slot name="header"></slot>
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
</style>
