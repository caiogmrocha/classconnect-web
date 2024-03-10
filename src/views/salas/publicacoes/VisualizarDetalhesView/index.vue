<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { format, compareAsc } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Icon } from '@iconify/vue/dist/iconify.js';

import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardDescription from '@/components/ui/card/CardDescription.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { toast } from '@/components/ui/toast';
import { Badge } from '@/components/ui/badge';
import { FileFlag } from '@/components/custom/file-flag';
import { publicacoesService, type BuscarPublicacaoPorIdResponse } from '@/services/PublicacoesService';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

const publicacao = ref<BuscarPublicacaoPorIdResponse>();

const route = useRoute();

const openFile = (url: string) => {
  window.open(url, '_blank');
}

onMounted(async () => {
  try {
    publicacao.value = await publicacoesService.buscarPorId({
      idSala: +route.params.idSala,
      idPublicacao: +route.params.idPublicacao
    });
  } catch (error: any) {
    if (error.response?.status === 400) {
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
        <CardHeader class="flex flex-row justify-between">
          <div class="flex flex-row">
            <span class="flex items-center justify-center bg-yellow-600 rounded-full p-2 mr-4" v-if="publicacao?.dataEntrega">
              <Icon icon="fluent:tasks-app-28-regular" height="36px" class="text-white" />
            </span>

            <span class="flex items-center justify-center bg-sky-600 rounded-full p-2 mr-4" v-else>
              <Icon icon="fluent:content-view-28-regular" height="36px" class="text-white" />
            </span>

            <div>
              <CardTitle class="mb-2">{{ publicacao?.titulo }}</CardTitle>
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
            </div>
          </div>

          <Badge
            v-if="publicacao?.dataEntrega && compareAsc(new Date(publicacao.dataEntrega), new Date()) === -1"
            class="ml-2 self-start cursor-default"
            variant="destructive"
          >
            Atrasada
          </Badge>
        </CardHeader>

        <Separator v-if="publicacao?.anexos?.length" />

        <CardContent class="grid gap-4 pt-6" v-if="publicacao?.anexos?.length">
          <p v-html="publicacao?.conteudo" v-if="publicacao?.conteudo">
          </p>

          <Card>
            <CardContent class="p-0">
              <Table class="w-[100%]">
                <!-- <TableCaption>Anexos</TableCaption> -->
                <TableBody>
                  <TableRow v-for="anexo in publicacao?.anexos" :key="anexo.caminho" @click="openFile(anexo.caminho)" class="cursor-pointer hover:bg-gray-100">
                      <TableCell>
                        <FileFlag :mimeType="anexo.mimetype" />
                      </TableCell>
                      <TableCell class="font-medium w-full">
                        {{ anexo.caminho.split('/').pop() }}
                      </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </CardContent>
        <!-- <CardFooter>
          <Button class="w-full">
            <Check class="mr-2 h-4 w-4" /> Mark all as read
          </Button>
        </CardFooter> -->
      </Card>
    </main>
  </ScrollArea>
</template>
