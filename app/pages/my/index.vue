<template>
    <div class="container">
        <div class="space-y-4">
            <h1 class="text-4xl font-bold text-primary">Weiterleitung...</h1>
            <p>Diese Seite wurde zur neuen Login-Seite weitergeleitet.</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
// Redirect legacy /my route to new Appwrite auth
await navigateTo('/account/login');
</script>
