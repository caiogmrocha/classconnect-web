<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

</script>

<template>
    <div class="flex flex-1 h-full w-full p-4">
        <main class="grid grid-cols-4 gap-4 w-full h-full">
            <Card class="max-h-60 border-2 hover:border-2 hover:cursor-pointer transition-all hover:border-blue-500">
                <CardHeader class="flex flex-row items-center space-y-0 pb-2">
                    <CardTitle class="text-xl font-bold">
                        Sala 1
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="text-lg font-medium">
                        Nome do Professor
                    </div>
                    <p class="text-xs text-muted-foreground">
                        Descrição da sala
                    </p>
                </CardContent>
            </Card>
        </main>
    </div>
</template>