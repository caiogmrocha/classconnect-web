<script setup lang="ts">
import { computed } from 'vue'
import { ToastViewport } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps({
	class: {
		type: String,
		default: '',
	},
	open: {
		type: Boolean,
		default: true,
	},
	onOpenChange: {
		type: () => true,
		default: undefined,
	},
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

	_;

  return delegated
})
</script>

<template>
  <ToastViewport v-bind="delegatedProps" :class="cn('fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]', props.class)" />
</template>
