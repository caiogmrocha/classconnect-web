<script setup>
import { ref } from 'vue'
import { Loader2 } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'

const isLoading = ref(false)

const formSchema = toTypedSchema(z.object({
	email: z.string({ invalid_type_error: 'O e-mail não pode ser vazio' }).email({ message: 'O e-mail não é válido' }),
	senha: z.string({ invalid_type_error: 'A senha não pode ser vazia' }).min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
}))


const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
		email: '',
		senha: '',
  },
})

const onSubmit = handleSubmit((values) => {
	isLoading.value = true;
	setTimeout(() => {
		isLoading.value = false;
	}, 2000)
})
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit.prevent="onSubmit" class="w-[450px]">
      <div class="grid gap-4">
				<FormField v-slot="{ componentField }" name="email">
					<FormItem>
						<FormLabel>E-mail</FormLabel>
						<FormControl>
							<Input type="email" placeholder="address@email.com" v-bind="componentField" />
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>

				<FormField v-slot="{ componentField }" name="senha">
					<FormItem>
						<FormLabel>Senha</FormLabel>
						<FormControl>
							<Input type="password" placeholder="mínimo de 8 caracteres" v-bind="componentField" />
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>

        <Button type="submit" :disabled="isLoading">
          <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          Entrar
        </Button>
      </div>
    </form>
  </div>
</template>
