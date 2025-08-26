<template>
  <ProfileHeader />
  <section class="py-16">
    <UContainer class="space-y-8">
      <h1 class="text-2xl font-bold">Settings</h1>

      <UCard>
        <template #header>
          <h2 class="text-xl font-bold">Erscheinungsbild</h2>
        </template>
        <div class="flex justify-between items-center">
          <ProfileColorSchemaSwitcher />
          <ProfileColorMode />
        </div>
      </UCard>

      <!-- AKZENTFARBE -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-bold">Akzentfarbe</h2>
        </template>

        <div>
          <div class="flex flex-wrap gap-3">
            <UButton
              v-for="primaryColor in availablePrimaryColors"
              :key="primaryColor"
              @click="changeAppConfigPrimaryColor(primaryColor)"
              color="neutral"
              variant="solid"
              square
              size="xl"
              :class="buttonPrimaryClasses(primaryColor, appConfig.ui.colors.primary === primaryColor)"
              :aria-pressed="appConfig.ui.colors.primary === primaryColor"
              :title="primaryColor"
            />
          </div>
        </div>

        <template #footer>
          <p class="text-primary capitalize">
            {{ appConfig.ui.colors.primary }}
          </p>
        </template>
      </UCard>

      <!-- HINTERGRUNDFARBE -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-bold">Hintergrundfarbe</h2>
        </template>

        <div>
          <div class="flex flex-wrap gap-3">
            <UButton
              v-for="grayColor in availableGrayColors"
              :key="grayColor"
              @click="changeAppConfigGrayColor(grayColor)"
              :label="capitalize(grayColor)"
              variant="solid"
              color="neutral"
              class="capitalize"
              :class="buttonGrayClasses(grayColor, appConfig.ui.colors.neutral === grayColor)"
              :aria-pressed="appConfig.ui.colors.neutral === grayColor"
            />
          </div>
        </div>

        <template #footer>
          <p class="text-neutral-500 capitalize">
            {{ appConfig.ui.colors.neutral }}
          </p>
        </template>
      </UCard>
    </UContainer>
  </section>
</template>

<script lang="ts" setup>
import { useSettingsStore } from '~/stores/settings'
import { onMounted } from 'vue'

const settingsStore = useSettingsStore()
const appConfig = useAppConfig()

/** Shades, die Nuxt UI erwartet */
const SHADES = ['50','100','200','300','400','500','600','700','800','900','950'] as const

function applyUiColor(alias: 'primary' | 'neutral' | 'gray', colorName: string) {
  const root = document.documentElement
  for (const s of SHADES) {
    root.style.setProperty(`--ui-color-${alias}-${s}`, `var(--color-${colorName}-${s})`)
  }
  root.style.setProperty(`--ui-${alias}`, `var(--ui-color-${alias}-500)`)
}

// ----------------- Farben -----------------
const availablePrimaryColors = [
  // Tailwind-Standard
  'red','orange','amber','yellow','lime','green','emerald','teal','cyan','sky',
  'blue','indigo','violet','purple','fuchsia','pink','rose',
  // fleava (aus @theme in assets/css/main.css)
  'fleava-green-mist','fleava-frangipani','fleava-flesh','fleava-wax-flower',
  'fleava-tropical-blue','fleava-parchment','fleava-bone','fleava-just-right',
  'fleava-malta','fleava-silver-chalice','fleava-navajo-white','fleava-moon-raker',
  'fleava-steel-gray','fleava-mirage','fleava-heavy-metal','fleava-log-cabin',
  'fleava-rangoon-green','fleava-mine-shaft','fleava-masala','fleava-shark',
  'fleava-zeus','fleava-oil','fleava-blue-whale','fleava-woodsmoke',
  'fleava-birch','fleava-pancho'
]

const availableGrayColors = ['slate', 'gray', 'zinc', 'neutral', 'stone']

// ----------------- Aktionen -----------------
const changeAppConfigPrimaryColor = (primaryColor: string) => {
  // AppConfig ändern
  // @ts-ignore runtime field
  appConfig.ui.colors.primary = primaryColor
  settingsStore.changeColor(primaryColor)
  // UI Variablen setzen (damit fleava funktioniert)
  applyUiColor('primary', primaryColor)
}

const changeAppConfigGrayColor = (grayColor: string) => {
  // AppConfig ändern
  // @ts-ignore runtime field
  appConfig.ui.colors.neutral = grayColor
  settingsStore.changeGrayColor(grayColor)
  // Hintergrund bleibt wie vorher -> nichts extra nötig
}

// ----------------- Buttons -----------------
const buttonGrayClasses = (name: string, active: boolean) => {
  const MAP: Record<string, string> = {
    slate:   '!bg-slate-500 hover:!bg-slate-600 !text-white',
    gray:    '!bg-gray-500 hover:!bg-gray-600 !text-white',
    zinc:    '!bg-zinc-500 hover:!bg-zinc-600 !text-white',
    neutral: '!bg-neutral-500 hover:!bg-neutral-600 !text-white',
    stone:   '!bg-stone-500 hover:!bg-stone-600 !text-white'
  }
  const base = MAP[name] ?? MAP.neutral
  const ring = active ? ' ring-2 ring-offset-2 ring-black/20 dark:ring-white/30' : ''
  return base + ring + ' border border-black/5 dark:border-white/10'
}

const buttonPrimaryClasses = (name: string, active: boolean) => {
  const STD: Record<string, string> = {
    red: '!bg-red-500 hover:!bg-red-600 !text-white',
    orange: '!bg-orange-500 hover:!bg-orange-600 !text-white',
    amber: '!bg-amber-500 hover:!bg-amber-600 !text-black',
    yellow: '!bg-yellow-400 hover:!bg-yellow-500 !text-black',
    lime: '!bg-lime-500 hover:!bg-lime-600 !text-black',
    green: '!bg-green-500 hover:!bg-green-600 !text-white',
    emerald: '!bg-emerald-500 hover:!bg-emerald-600 !text-white',
    teal: '!bg-teal-500 hover:!bg-teal-600 !text-white',
    cyan: '!bg-cyan-500 hover:!bg-cyan-600 !text-black',
    sky: '!bg-sky-500 hover:!bg-sky-600 !text-white',
    blue: '!bg-blue-500 hover:!bg-blue-600 !text-white',
    indigo: '!bg-indigo-500 hover:!bg-indigo-600 !text-white',
    violet: '!bg-violet-500 hover:!bg-violet-600 !text-white',
    purple: '!bg-purple-500 hover:!bg-purple-600 !text-white',
    fuchsia: '!bg-fuchsia-500 hover:!bg-fuchsia-600 !text-white',
    pink: '!bg-pink-500 hover:!bg-pink-600 !text-white',
    rose: '!bg-rose-500 hover:!bg-rose-600 !text-white'
  }

  const FLEAVA: Record<string, string> = {
    'fleava-green-mist': '!bg-fleava-green-mist-500 hover:!bg-fleava-green-mist-600 !text-white',
    'fleava-frangipani': '!bg-fleava-frangipani-500 hover:!bg-fleava-frangipani-600 !text-white',
    'fleava-flesh': '!bg-fleava-flesh-500 hover:!bg-fleava-flesh-600 !text-white',
    'fleava-wax-flower': '!bg-fleava-wax-flower-500 hover:!bg-fleava-wax-flower-600 !text-white',
    'fleava-tropical-blue': '!bg-fleava-tropical-blue-500 hover:!bg-fleava-tropical-blue-600 !text-white',
    'fleava-parchment': '!bg-fleava-parchment-500 hover:!bg-fleava-parchment-600 !text-white',
    'fleava-bone': '!bg-fleava-bone-500 hover:!bg-fleava-bone-600 !text-white',
    'fleava-just-right': '!bg-fleava-just-right-500 hover:!bg-fleava-just-right-600 !text-white',
    'fleava-malta': '!bg-fleava-malta-500 hover:!bg-fleava-malta-600 !text-white',
    'fleava-silver-chalice': '!bg-fleava-silver-chalice-500 hover:!bg-fleava-silver-chalice-600 !text-white',
    'fleava-navajo-white': '!bg-fleava-navajo-white-500 hover:!bg-fleava-navajo-white-600 !text-black',
    'fleava-moon-raker': '!bg-fleava-moon-raker-500 hover:!bg-fleava-moon-raker-600 !text-white',
    'fleava-steel-gray': '!bg-fleava-steel-gray-500 hover:!bg-fleava-steel-gray-600 !text-white',
    'fleava-mirage': '!bg-fleava-mirage-500 hover:!bg-fleava-mirage-600 !text-white',
    'fleava-heavy-metal': '!bg-fleava-heavy-metal-500 hover:!bg-fleava-heavy-metal-600 !text-white',
    'fleava-log-cabin': '!bg-fleava-log-cabin-500 hover:!bg-fleava-log-cabin-600 !text-white',
    'fleava-rangoon-green': '!bg-fleava-rangoon-green-500 hover:!bg-fleava-rangoon-green-600 !text-white',
    'fleava-mine-shaft': '!bg-fleava-mine-shaft-500 hover:!bg-fleava-mine-shaft-600 !text-white',
    'fleava-masala': '!bg-fleava-masala-500 hover:!bg-fleava-masala-600 !text-white',
    'fleava-shark': '!bg-fleava-shark-500 hover:!bg-fleava-shark-600 !text-white',
    'fleava-zeus': '!bg-fleava-zeus-500 hover:!bg-fleava-zeus-600 !text-white',
    'fleava-oil': '!bg-fleava-oil-500 hover:!bg-fleava-oil-600 !text-white',
    'fleava-blue-whale': '!bg-fleava-blue-whale-500 hover:!bg-fleava-blue-whale-600 !text-white',
    'fleava-woodsmoke': '!bg-fleava-woodsmoke-500 hover:!bg-fleava-woodsmoke-600 !text-white',
    'fleava-birch': '!bg-fleava-birch-500 hover:!bg-fleava-birch-600 !text-white',
    'fleava-pancho': '!bg-fleava-pancho-500 hover:!bg-fleava-pancho-600 !text-white'
  }

  const base = STD[name] ?? FLEAVA[name] ?? '!bg-neutral-500 hover:!bg-neutral-600 !text-white'
  const ring = active ? ' ring-2 ring-offset-2 ring-black/20 dark:ring-white/30' : ''
  return base + ring + ' border border-black/5 dark:border-white/10 rounded-lg'
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

// initial sync (falls reload)
onMounted(() => {
  applyUiColor('primary', appConfig.ui.colors.primary)
})
</script>