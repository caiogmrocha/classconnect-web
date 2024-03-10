<script setup lang="ts">
import { onMounted, ref } from 'vue';
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
import { publicacoesService, type BuscarPublicacaoPorIdResponse } from '@/services/PublicacoesService';
import { toast } from '@/components/ui/toast';
import { FileFlag } from '@/components/custom/file-flag';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import Table from '@/components/ui/table/Table.vue';
import TableCaption from '@/components/ui/table/TableCaption.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableHead from '@/components/ui/table/TableHead.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableRow from '@/components/ui/table/TableRow.vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import Separator from '@/components/ui/separator/Separator.vue';

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
        <CardHeader class="flex flex-row">
          <span class="flex items-center justify-center bg-sky-600 rounded-full p-2 mr-3">
            <Icon icon="fluent:content-view-28-regular" height="30px" class="text-white" />
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
        </CardHeader>

        <Separator />

        <CardContent class="grid gap-4 pt-6">
          <p>
            {{ publicacao?.conteudo || "" }}
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