<script setup lang="ts">
import { onMounted, ref } from "vue";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { salasService, type ListarSalasResponse } from "@/services/SalasService";

const salas = ref<ListarSalasResponse[]>([]);

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
            <Card class="max-h-60 border-2 hover:border-2 hover:cursor-pointer transition-all hover:border-blue-500" v-for="sala in salas" :key="sala.id">
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
        </main>
    </div>
</template>