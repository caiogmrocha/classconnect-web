<script setup lang="ts">
import { ToastProvider } from 'radix-vue'

const props = defineProps({
	position: {
		type: String,
		default: 'top-right',
	},
	duration: {
		type: Number,
		default: 5000,
	},
	max: {
		type: Number,
		default: 5,
	},
	class: {
		type: String,
		default: '',
	},
})
</script>

<template>
  <ToastProvider v-bind="props">
    <slot />
  </ToastProvider>
</template>
