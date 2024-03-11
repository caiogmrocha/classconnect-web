<script setup lang="ts">
import { ref } from 'vue'
import { Loader2 } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import router from '@/router'
import { perfisService } from '@/services/PerfisService'
import { toast } from '@/components/ui/toast'

const isLoading = ref(false)

const formSchema = toTypedSchema(z.object({
	nome: z.string({ invalid_type_error: 'O nome não pode ser vazio' }),
	email: z.string({ invalid_type_error: 'O e-mail não pode ser vazio' }).email({ message: 'O e-mail não é válido' }),
	senha: z.string({ invalid_type_error: 'A senha não pode ser vazia' }).min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
	tipoPerfil: z.string({ invalid_type_error: 'O tipo do perfil não pode ser vazio' }).refine(value => ['ALUNO', 'PROFESSOR'].includes(value), { message: 'O tipo do perfil deve ser ALUNO ou PROFESSOR' })
}))


const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
		nome: '',
		email: '',
		senha: '',
		tipoPerfil: 'ALUNO'
  },
})

const onSubmit = handleSubmit(async (values) => {
	try {
		isLoading.value = true;

		const response = await perfisService.cadastrar({
			nome: values.nome,
			email: values.email,
			senha: values.senha,
			tipoPerfil: values.tipoPerfil,
		});

		toast({
      title: response.mensagem
    });

		router.push({ name: 'login' });
	} catch (error: any) {
		switch (error.response?.status) {
			case 403:
			case 400:
				alert(error.response.data.mensagem);
				break;
			default:
				alert('Erro ao tentar fazer login');
				break;
		}
	} finally {
		isLoading.value = false;
	}
})
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit.prevent="onSubmit" class="w-[450px]">
      <div class="grid gap-4">
				<FormField v-slot="{ componentField }" name="nome">
					<FormItem>
						<FormLabel>Nome</FormLabel>
						<FormControl>
							<Input type="nome" placeholder="Digite seu nome..." v-bind="componentField" />
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>

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

				<FormField v-slot="{ componentField }" type="radio" name="tipoPerfil">
					<FormItem class="space-y-3">
						<FormLabel>Tipo de perfil</FormLabel>

						<FormControl>
							<RadioGroup class="flex flex-col space-y-1" v-bind="componentField">
								<FormItem class="flex items-center space-y-0 gap-x-3">
									<FormControl>
										<RadioGroupItem value="ALUNO" />
									</FormControl>
									<FormLabel class="font-normal">
										Aluno
									</FormLabel>
								</FormItem>

								<FormItem class="flex items-center space-y-0 gap-x-3">
									<FormControl>
										<RadioGroupItem value="PROFESSOR" />
									</FormControl>
									<FormLabel class="font-normal">
										Professor
									</FormLabel>
								</FormItem>
							</RadioGroup>
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
