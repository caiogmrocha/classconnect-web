<script setup lang="ts">
import { Check } from 'lucide-vue-next';
import { useRoute } from 'vue-router';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardDescription from '@/components/ui/card/CardDescription.vue';
import CardFooter from '@/components/ui/card/CardFooter.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';
import { onMounted, ref } from 'vue';
import { publicacoesService, type BuscarPublicacaoPorIdResponse } from '@/services/PublicacoesService';
import { toast } from '@/components/ui/toast';
import { FileFlag } from '@/components/custom/file-flag';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';

const publicacao = ref<BuscarPublicacaoPorIdResponse>();

const route = useRoute();

onMounted(async () => {
  try {
    publicacao.value = await publicacoesService.buscarPorId({
      idSala: +route.params.idSala,
      idPublicacao: +route.params.idPublicacao
    });
  } catch (error: any) {
    if (error.response?.status === 404) {
      toast({
        title: error.response.data.mensagem,
      });
    } else {
      toast({
        title: "Erro ao obter publicação",
        description: "Ocorreu um erro ao obter a publicação, tente novamente mais tarde.",
      });
    }
  }
});
</script>

<template>
  <ScrollArea class="flex flex-1 h-screen w-full">
    <main class="flex items-center justify-center flex-1 h-full p-5">
      <Card class="w-full max-w-[900px]">
        <CardHeader>
          <CardTitle>{{ publicacao?.titulo }}</CardTitle>
          <CardDescription>
            {{
              publicacao?.dataCadastro
                ? format(
                    new Date(publicacao?.dataCadastro),
                    "'Publicado em ' PPP (dd/MM/yyyy)",
                    { locale: ptBR }
                  )
                : null
            }}
            <br />
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          {{ publicacao?.conteudo || "" }}

          <FileFlag mime-type="application/pdf" />
          <FileFlag mime-type="application/vnd.ms-excel" />
          <FileFlag mime-type="application/msword" />
          <FileFlag mime-type="image/jpg" />
        </CardContent>
        <CardFooter>
          <Button class="w-full">
            <Check class="mr-2 h-4 w-4" /> Mark all as read
          </Button>
        </CardFooter>
      </Card>
    </main>
  </ScrollArea>
</template>
