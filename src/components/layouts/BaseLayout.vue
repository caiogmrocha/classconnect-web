<script lang="ts" setup>

import { ref } from 'vue'
import Nav, { type LinkProp } from '@/components/custom/Nav.vue'
import { useRouter } from 'vue-router';
import { BookOpenText } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import { useColorMode } from '@vueuse/core';
import { perfisService } from '@/services/PerfisService';
import Button from '../ui/button/Button.vue';

interface MailProps {
  defaultLayout?: number[]
  defaultCollapsed?: boolean
}

const props = withDefaults(defineProps<MailProps>(), {
  defaultCollapsed: false,
  defaultLayout: () => [265, 440, 655],
})

const isCollapsed = ref(props.defaultCollapsed)

const router = useRouter();

const mode = useColorMode();

function logout() {
  perfisService.logout();

  router.push({ name: 'login' });
}

const links: LinkProp[] = [
  {
    title: 'Listar Salas',
    icon: 'lucide:list',
    variant: 'ghost',
    routeName: 'salas'
  },
  {
    title: 'Cadastrar Sala',
    icon: 'lucide:plus',
    variant: 'ghost',
    routeName: 'cadastrar-sala'
  },
]
</script>

<template>
  <header :class="cn(
    'w-full h-16 shadow-md flex items-center justify-between px-4', {
      'bg-white': mode === 'light',
      'bg-gray-800': mode === 'dark'
    }
  )">
    <div class="gap-4">
      <h1 class="flex items-center text-2xl font-bold text-blue-600 gap-2">
        <BookOpenText />

        ClassConnect
      </h1>
    </div>

    <div class="flex items-center gap-4">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <Button class="text-sm font-semibold transition-all cursor-pointer"  @click="logout" variant="destructive">
            Sair
          </Button>
        </div>
      </div>
    </div>
  </header>

  <div class="flex items-start h-full">
    <aside class="w-[20vw] h-full border-r border-r-gray-400">
      <Nav
        :is-collapsed="isCollapsed"
        :links="links"
      />
    </aside>

    <router-view></router-view>
  </div>
</template>
