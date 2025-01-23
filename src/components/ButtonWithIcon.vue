<template>
  <button
    :type="type"
    class="button-with-icon"
    :class="buttonClass"
    @click="$emit('click', $event)"
  >
    <span
      v-if="icon"
      class="icon"
      :style="{
        backgroundImage: `url(${icon})`,
        filter: iconFilter,
      }"
    ></span>
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
  iconColor: {
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

const iconFilter = computed(() => {
  if (props.iconColor) {
    return `brightness(0) saturate(100%) invert(77%) sepia(8%) saturate(446%) hue-rotate(175deg) brightness(105%) contrast(90%)`
  }
  return null
})
</script>

<style lang="scss" scoped>
.button-with-icon {
  padding: 0.625rem 0.75rem;
  border-radius: var(--border-radius-small);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
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
  background-color: var(--light-grey-color);
}
.button-style--success {
  background-color: var(--success-color);
}
.button-style--errors {
  background-color: var(--error-color);
}
.button-style--default,
.button-style--success,
.button-style--errors {
  stroke: var(--light-grey-color);
}
.button-style--default:hover,
.button-style--default:active {
  stroke: var(--error-color);
}
.button-style--success:hover,
.button-style--errors:hover,
.button-style--success:active,
.button-style--errors:active {
  stroke: var(--background-color);
}
.button-style--text {
  background-color: transparent;
  color: var(--background-color);
}
.button-style--text:hover,
.button-style--text:active {
  color: var(--light-grey-color);
}
</style>
