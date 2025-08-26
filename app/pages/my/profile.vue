<template>
    <div class="container font-sans">
        <div class="space-y-4">
            <h1 class="text-4xl font-bold text-primary">Weiterleitung...</h1>
            <p>Diese Seite wurde zur neuen Profil-Seite weitergeleitet.</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
// Redirect legacy /my/profile route to new Appwrite profile
await navigateTo('/account/profile');
</script>
