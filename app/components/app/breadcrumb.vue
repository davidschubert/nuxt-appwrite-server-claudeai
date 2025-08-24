<template>
    <UBreadcrumb :divider="divider" :links="breadcrumbLinks" />
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, computed } from "vue";

// Get the current route
const route = useRoute();

// Define a ref for the divider, which can be customized
const divider = ref("/");

// Computed property to generate breadcrumb links based on the route path
const breadcrumbLinks = computed(() => {
    // Split the path into an array of segments, ignoring any leading/trailing slashes
    const paths = route.path.split("/").filter((segment) => segment);

    // Start with the Home link, which is not clickable if on the homepage
    const links = [
        {
            label: "Home",
            to: route.path === "/" ? undefined : "/", // Only add `to` if not on the Home page
        },
    ];

    // Map each segment to a breadcrumb link object
    paths.forEach((segment, index) => {
        // Construct the path up to the current segment
        const to = "/" + paths.slice(0, index + 1).join("/");

        // Capitalize the segment to use as the label
        const label = segment.charAt(0).toUpperCase() + segment.slice(1);

        // Add the breadcrumb link object to the array
        links.push({
            label,
            to: index === paths.length - 1 ? undefined : to, // Only add `to` if it's not the last segment
        });
    });

    return links;
});
</script>
