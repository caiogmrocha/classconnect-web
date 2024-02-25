<script setup>
import './assets/index.css';
import { Toaster } from './components/ui/toast';
</script>

<template>
  <RouterView class="d-flex items-center justify-center h-[100vh] w-[100vw]"/>
	<Toaster />
</template>

<style scoped>
</style>
