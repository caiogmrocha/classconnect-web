<script setup>
import Button from "@/components/ui/button/Button.vue";
import { Loader2 } from "lucide-vue-next";

import './assets/index.css';

</script>

<template>
  <Button>
    <Loader2 class="w-4 h-4 mr-2 animate-spin"/> Hello World
  </Button>

  <!-- <RouterView /> -->
</template>

<style scoped>
</style>
