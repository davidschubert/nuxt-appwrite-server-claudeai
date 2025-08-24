<template>
    <div>
        <ul>
            <li><strong>Email:</strong> {{ user.email }}</li>
            <li><strong>Name:</strong> {{ user.name }}</li>
            <li><strong>ID: </strong> {{ user.$id }}</li>
        </ul>
        <form method="post" action="/api/signout">
            <button type="submit">Log out</button>
        </form>
    </div>
</template>

<script setup>
const { context } = useEvent();
const { user } = context;
</script>
