<script setup lang="ts">
import LoginForm from '@/views/perfis/LoginView/LoginForm.vue'
</script>

<template>
	<div class="flex items-center justify-between">
		<div class="flex-[0.7] h-[100%] hidden lg:flex">
			<img src="@/assets/images/landing-login.jpg" alt="Logo" class="w-[100%] h-[100%] object-cover" />
		</div>
		<div class="flex flex-col flex-1 items-center justify-center" >
			<div class="flex flex-col space-y-2 text-center mb-6">
				<h1 class="text-2xl font-semibold tracking-tight"> Seja bem-vindo! </h1>
				<p class="text-sm text-muted-foreground"> Acesse sua conta para continuar </p>
			</div>
			<LoginForm />
		</div>
	</div>
</template>
