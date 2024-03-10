<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Icon } from '@iconify/vue';

import { toast } from '@/components/ui/toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type ListarPublicacoesResponse, publicacoesService } from '@/services/PublicacoesService';
import { type ListarSalasResponse, salasService } from '@/services/SalasService';

const route = useRoute();

const publicacoes = ref<ListarPublicacoesResponse[]>([]);
const sala = ref<ListarSalasResponse>();

onMounted(async () => {
  try {
    sala.value = await salasService.buscarPorId({ id: +route.params.id });
  } catch (error) {
    toast({
      title: "Erro ao obter sala",
      description: "Ocorreu um erro ao obter a sala, tente novamente mais tarde.",
    });
  }

  try {
    publicacoes.value = await publicacoesService.listar({ idSala: +route.params.id });
  } catch (error) {
    toast({
      title: "Erro ao listar publicações",
      description: "Ocorreu um erro ao listar as publicações, tente novamente mais tarde.",
    });
  }
});

</script>

<template>
    <ScrollArea class="flex flex-1 h-screen w-full">
      <header class="h-60 bg-[url('/src/assets/images/classroom-banner.jpg')]">
        <div class="flex flex-col items-center justify-center h-full w-full bg-black bg-opacity-50">
          <div class="text-4xl font-semibold text-white">
            {{ sala?.nome }}
          </div>
          <div class="text-lg text-white">
            {{ sala?.descricao }}
          </div>
        </div>
      </header>

      <main class="flex flex-col px-80 h-screen w-full py-4 gap-4">
        <div class="flex flex-row items-center gap-2 rounded-lg border p-3 text-left text-sm transition-all w-full hover:bg-accent cursor-pointer" v-for="publicacao in publicacoes" :key="publicacao.id">
          <span class="flex items-center justify-center bg-sky-600 rounded-full p-2 mr-1">
            <Icon icon="fluent:content-view-28-regular" height="30px" class="text-white" />
          </span>
          
          <div class="flex w-full flex-col gap-1">
            <div class="flex items-center">
              <div class="flex items-center gap-2">
                <div class="font-semibold">
                  {{ publicacao.titulo }}
                </div>
                <span v-if="false" class="flex h-2 w-2 rounded-full bg-blue-600" />
              </div>
              <div class="ml-auto text-xs text-muted-foreground">
                {{ formatDistanceToNow(new Date(), { addSuffix: true, locale: ptBR }) }}
              </div>
            </div>

            <div class="line-clamp-2 text-xs text-muted-foreground" v-html="publicacao.conteudo">
            </div>
          </div>
        </div>
      </main>
    </ScrollArea>
</template>