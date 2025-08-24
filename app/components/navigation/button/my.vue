<template>
    <div class="space-x-2 flex items-center">
        <UButton variant="ghost" to="/my">Login</UButton>
        <UButton variant="ghost" to="/my/profile">Protected Profile</UButton>
        <template v-if="!!myUser">
            <UBadge
                color="green"
                variant="soft"
                size="xs"
                :ui="{ rounded: 'rounded-full' }"
                class="uppercase"
                >On</UBadge
            >
        </template>
        <template v-else>
            <UBadge
                color="red"
                variant="soft"
                size="xs"
                :ui="{ rounded: 'rounded-full' }"
                class="uppercase"
                >Off</UBadge
            >
        </template>
    </div>
</template>

<script lang="ts" setup>
const userStore = useUserStore();
const { myUser } = storeToRefs(userStore);
</script>
