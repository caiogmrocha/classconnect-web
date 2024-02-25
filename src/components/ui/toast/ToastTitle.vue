<script setup lang="ts">
import { computed } from 'vue'
import { ToastTitle } from 'radix-vue'
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
  <ToastTitle v-bind="delegatedProps" :class="cn('text-sm font-semibold', props.class)">
    <slot />
  </ToastTitle>
</template>
