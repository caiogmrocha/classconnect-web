<script setup>
import './assets/index.css';

import { RouterView } from 'vue-router';

import Toaster from './components/ui/toast/Toaster.vue';
import { ToggleTheme } from './components/custom/toggle-theme';
</script>

<template>
  <div class="relative">
    <ToggleTheme class="absolute top-4 right-4 z-50" />
  </div>

  <RouterView class="d-flex items-center justify-center h-[100vh] w-[100vw]"/>

  <Toaster />
</template>

<style scoped>
</style>
