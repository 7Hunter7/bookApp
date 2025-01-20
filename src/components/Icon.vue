<template>
  <span class="icon" v-html="svgContent"></span>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

const svgContent = ref('')

onMounted(async () => {
  try {
    const module = await import(`/icons/${props.name}.svg?raw`)
    svgContent.value = module.default
  } catch (error) {
    console.error('Failed to load SVG icon:', error)
  }
})
</script>

<style lang="scss" scoped>
.icon {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  vertical-align: middle;
}
</style>
