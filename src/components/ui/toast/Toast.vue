<script setup>
import { computed } from 'vue'
import { ToastRoot, useForwardPropsEmits } from 'radix-vue'
import { toastVariants } from '@/components/ui/toast'
import { cn } from '@/lib/utils'

const props = defineProps({
	variant: {
		type: String,
		default: 'default',
	},
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

const emits = defineEmits({
	'update:open': () => true,
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

	_;

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ToastRoot
    v-bind="forwarded"
    :class="cn(toastVariants({ variant }), props.class)"
    @update:open="onOpenChange"
  >
    <slot />
  </ToastRoot>
</template>
