<template>
  <button
    type="button"
    class="delete-button"
    :class="{ 'delete-button--hovered': isHovered, 'delete-button--active': isActive }"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    @mousedown="isActive = true"
    @mouseup="isActive = false"
    @click="$emit('click', $event)"
  >
    <span class="icon" :style="{ backgroundImage: `url(${icon})` }">
      <svg width="21" height="21" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 5.5H18"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.3333 5.5V17.1667C16.3333 18 15.5 18.8333 14.6666 18.8333H6.33329C5.49996 18.8333 4.66663 18 4.66663 17.1667V5.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.16663 5.50002V3.83335C7.16663 3.00002 7.99996 2.16669 8.83329 2.16669H12.1666C13 2.16669 13.8333 3.00002 13.8333 3.83335V5.50002"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.83337 9.66669V14.6667"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.1666 9.66669V14.6667"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <slot></slot>
  </button>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    default: '/icons/trash.svg',
  },
})

const emit = defineEmits(['click'])

const isHovered = ref(false)
const isActive = ref(false)
</script>

<style lang="scss" scoped>
.delete-button {
  padding: 0.625rem 0.75rem;
  border-radius: var(--border-radius-small);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background-color: var(--light-grey-color);
  color: var(--background-color);
  position: relative;
  overflow: hidden;

  svg {
    display: block;
    width: 1.25rem;
    height: 1.25rem;
  }
}

.delete-button:hover,
.delete-button:active {
  color: var(--error-color);
}

.delete-button--hovered {
  background-color: var(--light-grey-color);
  &:hover {
    background-color: var(--light-grey-color), rgba(0, 0, 0, 0.1);
  }
}

.delete-button--active {
  background-color: var(--light-grey-color);
  &:hover {
    background-color: var(--light-grey-color), rgba(0, 0, 0, 0.1);
  }
}
</style>
