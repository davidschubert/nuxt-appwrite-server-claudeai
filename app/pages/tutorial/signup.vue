<!-- pages/signup.vue -->
<template>
    <div>
        <ClientOnly>
            <UForm method="post" action="/api/tutorial/signup">
                <input
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                />
                <input
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                />
                <UButton variant="outline" type="submit">Sign up</UButton>
            </UForm>
            <UForm method="post" action="/api/tutorial/oauth">
                <input type="hidden" name="provider" value="github" />
                <UButton type="submit">Sign up with GitHub</UButton>
            </UForm>
        </ClientOnly>
    </div>
</template>

<script lang="ts" setup></script>
