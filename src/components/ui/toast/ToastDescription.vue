<script setup>
import { computed } from 'vue'
import { ToastDescription } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps({
	class: {
		type: String,
		default: '',
	},
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

	_;

  return delegated
})
</script>

<template>
  <ToastDescription :class="cn('text-sm opacity-90', props.class)" v-bind="delegatedProps">
    <slot />
  </ToastDescription>
</template>
