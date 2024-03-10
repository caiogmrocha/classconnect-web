<script setup lang="ts">
import { ref } from 'vue'
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
import { publicacoesService } from '@/services/PublicacoesService'
import { useRoute } from 'vue-router'

const postFormSchema = toTypedSchema(z.object({
  titulo: z
    .string()
    .min(2, {
      message: 'O titulo deve ter no mínimo 2 caracteres.',
    })
    .max(30, {
      message: 'O titulo deve ter no máximo 30 caracteres.',
    }),
  conteudo: z
    .string()
    .min(2, {
      message: 'A descrição deve ter no mínimo 2 caracteres.',
    })
    .max(100, {
      message: 'A descrição deve ter no máximo 255 caracteres.',
  }),
  dataEntrega: z
    .date()
    .nullable(),
  arquivos: z
    .array(z
      .any()
      .refine((value?: File) => {
        if (!value) return true;
        
        const acceptedFormats = [
          "text/plain",
          "text/html",
          "image/png",
          "image/jpeg",
          "image/jpg",
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-powerpoint",
          "application/vnd.openxmlformats-officedocument.presentationml.presentatio",
        ];
        
        return acceptedFormats.includes(value.type);
      }, {
        message: 'O arquivo deve ser uma imagem PNG, JPEG, JPG, GIF, PDF, DOC, DOCX, XLS, XLSX, PPT ou PPTX.',
      })
      .refine((value: File) => {
        if (!value) return true;

        return value.size <= 5000000;
      }, {
        message: 'O arquivo deve ter no máximo 5MB.',
      }),
    )
    .nullable(),
}))

const { handleSubmit } = useForm({
  validationSchema: postFormSchema,
  initialValues: {
    titulo: '',
    conteudo: '',
    dataEntrega: null,
    arquivos: null,
  },
})

const isLoading = ref(false)

const route = useRoute();

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  
  try {
    const response = await publicacoesService.publicar({
      titulo: values.titulo,
      conteudo: values.conteudo,
      dataEntrega: values.dataEntrega,
      arquivos: values.arquivos || [],
      idSala: +route.params.id,
    })

    toast({ title: response.mensagem })
  } catch (error: any) {
    if (error.response?.status === 400) {
      return toast({ title: error.response.data.mensagem, variant: 'destructive' })
    }

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
        Publicar Material/Atividade
      </h3>
      <p class="text-sm text-muted-foreground">
        Preencha o formulário abaixo para publicar um novo material ou atividade.
      </p>
    </div>

    <Separator class="my-3"/>

    <form class="space-y-8" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="titulo">
        <FormItem>
          <FormLabel>Título</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Atividade 1, Material 2 ..." v-bind="componentField" />
          </FormControl>
          <FormDescription>
            Esse será o título que aparecerá no feed de publicações.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="conteudo">
        <FormItem>
          <FormLabel>Descrição</FormLabel>
          <FormControl>
            <Textarea placeholder="Esta atividade é sobre ..." v-bind="componentField" rows="10" />
          </FormControl>
          <FormDescription>
            Crie uma descrição explicando mais detalhes sobre a atividade ou material.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ handleChange, handleBlur }" name="arquivos">
        <FormItem>
          <FormLabel>Anexos</FormLabel>
          <FormControl>
            <Input type="file" @change="handleChange" @blur="handleBlur" multiple accept="
              text/plain,
              text/html,
              image/png,
              image/jpeg,
              image/jpg,
              application/pdf,
              application/msword,
              application/vnd.openxmlformats-officedocument.wordprocessingml.document,
              application/vnd.ms-excel,
              application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
              application/vnd.ms-powerpoint,
              application/vnd.openxmlformats-officedocument.presentationml.presentatio
            " />
          </FormControl>
          <FormDescription>
            Anexe arquivos relacionados a atividade ou material.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      
      <div class="flex gap-2 justify-start">
        <Button type="submit" :disabled="isLoading">
          <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          Publicar
        </Button>
      </div>
    </form>
  </main>
</template>