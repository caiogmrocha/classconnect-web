<script setup>
import './assets/index.css';

import { RouterView } from 'vue-router';
import Toaster from './components/ui/toast/Toaster.vue';
</script>

<template>
  <RouterView class="d-flex items-center justify-center h-[100vh] w-[100vw]"/>

  <Toaster />
</template>

<style scoped>
</style>
