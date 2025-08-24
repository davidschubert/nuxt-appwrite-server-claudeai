<script setup lang="ts">
const nuxtApp = useNuxtApp();
const {
    data: orderlist,
    status,
    error,
    refresh,
} = await useFetch("/api/appwrite/orders", {
    getCachedData(key) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
});

interface OrderRow {
    id: string;
    customer: string;
    status: string;
    type: string;
    total: number | string;
}

const columns = [
    {
        key: "id",
        label: "ID",
    },
    {
        key: "customer",
        label: "Customer",
        sortable: true,
    },
    {
        key: "status",
        label: "Status",
        sortable: true,
    },
    {
        key: "type",
        label: "Type",
        sortable: true,
        direction: "desc" as const,
    },
    {
        key: "total",
        label: "Total",
        sortable: true,
    },
 ] as any;

// Transformieren Sie die Appwrite-Daten in das Format, das UTable erwartet
const myorders = computed<OrderRow[]>(() => {
    const list = (orderlist.value as any)?.orders ?? [];
    return list.map((order: any) => ({
        id: order.$id,
        customer: order.customer,
        status: order.status,
        type: order.type,
        total: order.total,
    }));
});
</script>

<template>
    <section class="py-32">
        <UContainer>
            <UCard>
                <template #header>
                    <div class="flex justify-between items-center">
                        <h1 class="text-2xl font-bold text-primary">Orders</h1>
                        <UButton v-if="!error" variant="ghost" @click="() => refresh()"
                            >Refresh</UButton
                        >
                    </div>
                </template>

                <template v-if="status === 'pending'"><p>Laden...</p></template>
                <template v-else-if="error">
                    <p>Du bist nicht eingeloggt.</p>
                </template>
                <template v-else>
                    <UTable :columns="columns" :rows="myorders" />
                </template>
            </UCard>
        </UContainer>
    </section>
</template>
