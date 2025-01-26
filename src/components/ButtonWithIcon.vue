<template>
  <button
    type="button"
    class="button-with-icon base-button"
    :class="{ 'base-button--hovered': isHovered, 'base-button--active': isActive }"
    :disabled="disabled"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    @mousedown="isActive = true"
    @mouseup="isActive = false"
    @click="$emit('click', $event)"
  >
    <span
      v-if="icon"
      class="icon"
      :style="{
        backgroundImage: `url(${icon})`,
      }"
    ></span>
    <slot v-if="text">{{ text }}</slot>
  </button>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    default: null,
  },
  text: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const isHovered = ref(false)
const isActive = ref(false)
</script>

<style lang="scss" scoped>
.icon {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 0.25rem;
  opacity: 0.5;
  transition: opacity 0.3s ease-in-out;
}
.button-with-icon {
  background-color: var(--success-color);
}
.button-with-icon:hover .icon,
.button-with-icon:active .icon {
  opacity: 1;
}
</style>
