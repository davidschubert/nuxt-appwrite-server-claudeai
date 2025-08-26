<script setup lang="ts">
const items = ref([
  {
    label: 'Hell',
    value: 'light'
  },
  {
    label: 'Dunkel',
    value: 'dark'
  },
  {
    label: 'Automatisch',
    value: 'system'
  }
])
const value = ref('system')
</script>

<template>
    <ClientOnly>
        <ColorScheme>
            <USelect
                id="color-mode"
                v-model="$colorMode.preference"
                :items="items"
                items-attribute="name"
                class="w-48"
            />
        </ColorScheme>
    </ClientOnly>
</template>
