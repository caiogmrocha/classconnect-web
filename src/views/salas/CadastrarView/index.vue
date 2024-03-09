<script setup lang="ts">
import { h, ref } from 'vue'
import {  useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Input } from '@/components/ui/input'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
import { Loader2 } from 'lucide-vue-next'
import { salasService } from '@/services/SalasService'

const profileFormSchema = toTypedSchema(z.object({
  nome: z
    .string()
    .min(2, {
      message: 'O nome deve ter no mínimo 2 caracteres.',
    })
    .max(30, {
      message: 'O nome deve ter no máximo 30 caracteres.',
    }),
  descricao: z
    .string()
    .min(2, {
      message: 'A descrição deve ter no mínimo 2 caracteres.',
    })
    .max(100, {
      message: 'A descrição deve ter no máximo 255 caracteres.',
  }),
  banner: z
    .any()
    .refine((value?: File) => {
      if (!value) return true;
      
      const acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
      
      return acceptedFormats.includes(value.type);
    }, {
      message: 'O arquivo deve ser uma imagem PNG, JPEG, JPG ou GIF.',
    })
    .refine((value: File) => {
      if (!value) return true;

      return value.size <= 5000000;
    }, {
      message: 'O arquivo deve ter no máximo 5MB.',
    })
    .nullable(),
}))

const { handleSubmit } = useForm({
  validationSchema: profileFormSchema,
  initialValues: {
    nome: '',
    descricao: '',
    banner: null,
  },
})

const isLoading = ref(false)

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  
  try {
    await salasService.cadastrar({
      nome: values.nome,
      descricao: values.descricao,
      banner: values.banner,
    });

    toast({ title: 'Sala cadastrada com sucesso!' })
  } catch (error) {
    toast({ title: 'Erro ao cadastrar sala!', variant: 'destructive' })
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <main class="h-full flex-1 p-5">
    <div>
      <h3 class="text-lg font-medium mb-3">
        Cadastrar Sala
      </h3>
      <p class="text-sm text-muted-foreground">
        Preencha o formulário abaixo para cadastrar uma nova sala.
      </p>
    </div>

    <Separator class="my-3"/>

    <form class="space-y-8" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="nome">
        <FormItem>
          <FormLabel>Nome</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Programação Orientada a Objetos, Algebra Linear ..." v-bind="componentField" />
          </FormControl>
          <FormDescription>
            Esse será o nome que aparecerá para os outros usuários.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="descricao">
        <FormItem>
          <FormLabel>Descrição</FormLabel>
          <FormControl>
            <Textarea placeholder="Esta sala é para ..." v-bind="componentField" />
          </FormControl>
          <FormDescription>
            Crie uma descrição explicando mais detalhes sobre a sala.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ handleChange, handleBlur }" name="banner">
        <FormItem>
          <FormLabel>Banner</FormLabel>
          <FormControl>
            <Input type="file" @change="handleChange" @blur="handleBlur" accept="image/png,image/jpeg,image/jpg,image/gif" />
          </FormControl>
          <FormDescription>
            Esta imagem será exibida como banner da sala.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      
      <div class="flex gap-2 justify-start">
        <Button type="submit" :disabled="isLoading">
          <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          Salvar
        </Button>
      </div>
    </form>
  </main>
</template>