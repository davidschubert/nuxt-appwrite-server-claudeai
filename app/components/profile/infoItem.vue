<template>
    <p class="flex justify-between items-baseline">
        <strong>{{ label }}:</strong>
        <span
            ><ClientOnly>{{ formattedValue }}</ClientOnly></span
        >
    </p>
</template>

<script setup lang="ts">
interface Props {
    label: string;
    value: string | number | boolean | null | undefined | any[] | object;
}

const props = withDefaults(defineProps<Props>(), {
    value: "",
});

const formattedValue = computed(() => {
    if (props.value === null || props.value === undefined) {
        return "Nicht angegeben";
    }
    if (typeof props.value === "boolean") {
        return props.value ? "Ja" : "Nein";
    }
    if (Array.isArray(props.value)) {
        return props.value.join(", ");
    }
    if (typeof props.value === "object") {
        return JSON.stringify(props.value);
    }
    return String(props.value);
});
</script>
