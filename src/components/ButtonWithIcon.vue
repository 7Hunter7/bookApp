<template>
  <button
    :type="type"
    class="button-with-icon"
    :class="buttonClass"
    @click="$emit('click', $event)"
  >
    <span v-if="icon" class="icon" :style="{ backgroundImage: `url(${icon})` }"></span>
    <slot v-if="text">{{ text }}</slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'submit',
  },
  icon: {
    type: String,
    default: null,
  },
  text: {
    type: String,
    default: null,
  },
  buttonStyle: {
    type: String,
    default: 'default',
  },
})

const emit = defineEmits(['click'])

const buttonClass = computed(() => {
  return `button-style--${props.buttonStyle}`
})
</script>

<style lang="scss" scoped>
.button-with-icon {
  padding: 0.625rem 0.75rem;
  border-radius: var(--border-radius-small);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}
.icon {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 0.25rem;
}

.button-style--default {
  background-color: var(--grey-color);
  color: var(--background-color);
}
.button-style--default:hover {
  background-color: var(--light-grey-color);
}

.button-style--success {
  background-color: var(--success-color);
  color: var(--background-color);
}
.button-style--success:hover {
  background-color: var(--secondary-color);
}
.button-style--errors {
  background-color: var(--error-color);
  color: var(--background-color);
}
.button-style--errors:hover {
  background-color: var(--error-color);
}

.button-style--text {
  background-color: transparent;
  color: var(--background-color);
  padding: 0;
}
.button-style--text:hover {
  color: var(--light-grey-color);
}
</style>
