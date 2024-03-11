<script setup lang="ts">
import { onMounted, ref } from "vue";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { salasService, type ListarSalasResponse } from "@/services/SalasService";
import { useRouter } from "vue-router";

const salas = ref<ListarSalasResponse[]>([]);

const router = useRouter();

onMounted(async () => {
  try {
    salas.value = await salasService.listar();
  } catch (error) {
    toast({
      title: "Erro ao listar salas",
      description: "Ocorreu um erro ao listar as salas, tente novamente mais tarde.",
    });
  }
});

</script>

<template>
  <div class="flex flex-1 h-full w-full p-4">
    <main class="grid grid-cols-4 gap-4 w-full h-full">
      <Card
        v-for="sala in salas"
        :key="sala.id"
        class="max-h-60 border-2 hover:border-2 hover:cursor-pointer transition-all hover:border-blue-500"
        @click="router.push({ name: 'publicacoes', params: { idSala: sala.id } })"
      >
        <CardHeader class="flex flex-row items-center space-y-0 pb-2">
          <CardTitle class="text-xl font-bold">
            {{ sala.nome }}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-lg font-medium">
            {{ sala.professor.nome }}
          </div>
          <p class="text-xs text-muted-foreground">
            {{ sala.descricao }}
          </p>
        </CardContent>
      </Card>

      <div v-if="salas.length === 0" class="col-span-4 flex items-center justify-center">
        <p class="text-2xl font-bold text-muted-foreground">Nenhuma sala cadastrada</p>
      </div>
    </main>
  </div>
</template>
