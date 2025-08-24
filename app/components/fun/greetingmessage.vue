<template>
    <div>
        <p>{{ greetingMessage }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const greetingMessage = ref("");

const getGreetingMessage = (): string => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 10) {
        return "Guten Morgen";
    } else if (currentHour >= 10 && currentHour < 12) {
        return "Guten Tag";
    } else if (currentHour >= 12 && currentHour < 17) {
        return "Schönen Nachmittag";
    } else if (currentHour >= 17 && currentHour < 21) {
        return "Guten Abend";
    } else {
        return "Du Nachteule";
    }
};

// Server-side
if (process.server) {
    greetingMessage.value = getGreetingMessage();
}

// Client-side
onMounted(() => {
    greetingMessage.value = getGreetingMessage();
});
</script>
