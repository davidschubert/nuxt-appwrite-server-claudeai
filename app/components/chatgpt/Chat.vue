<template>
    <div class="flex flex-col h-screen w-full">
        <!-- Chat messages -->
        <div
            ref="chatContainer"
            class="flex-1 overflow-y-auto w-full p-4 pt-28"
        >
            <div v-if="hasMoreMessages" class="text-center mb-4">
                <UButton @click="loadMoreMessages" size="sm" color="neutral"
                    >Ältere Nachrichten laden</UButton
                >
            </div>
            <div>
                <div
                    v-for="(message, index) in visibleMessages"
                    :key="index"
                    class="mb-6 w-full"
                >
                    <div
                        class="flex items-start w-full"
                        :class="{ 'justify-end': message.role === 'user' }"
                    >
                        <UAvatar
                            v-if="message.role !== 'user'"
                            icon="i-heroicons-chat-bubble-left-ellipsis"
                            color="primary"
                            class="shrink-0 mr-3"
                        />
                        <div
                            class="rounded-lg px-4 py-2 max-w-[80%]"
                            :class="{
                                'bg-primary-500 text-white':
                                    message.role === 'user',
                                'bg-gray-100 dark:bg-gray-700':
                                    message.role !== 'user',
                            }"
                        >
                            <div
                                v-if="isCodeBlock(message.content)"
                                class="bg-gray-800 text-white p-2 rounded"
                            >
                                <pre><code>{{ message.content.replace(/```/g, '').trim() }}</code></pre>
                            </div>
                            <div
                                v-else
                                class="message-content"
                                v-html="formatMessage(message.content)"
                            ></div>
                        </div>
                        <UAvatar
                            v-if="message.role === 'user'"
                            icon="i-heroicons-user"
                            color="primary"
                            class="shrink-0 ml-3"
                        />
                    </div>
                </div>
            </div>
        </div>

        <!-- Scroll to bottom button -->
        <UButton
            v-if="showScrollButton"
            icon="i-heroicons-arrow-down"
            color="primary"
            variant="solid"
            class="fixed bottom-20 right-4 rounded-full"
            @click="scrollToBottom"
        />

        <!-- Sticky input area -->
        <div
            class="sticky bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700"
        >
            <form @submit.prevent="sendMessage" class="flex space-x-2 w-full">
                <UInput
                    ref="inputField"
                    v-model="userInput"
                    placeholder="Nachricht eingeben..."
                    class="grow"
                    :ui="{
                        base: 'relative transition-all duration-300 w-full',
                        rounded: 'rounded-lg',
                    }"
                    :disabled="isLoading"
                />
                <UButton
                    type="submit"
                    :loading="isLoading"
                    :disabled="isLoading || !userInput.trim()"
                    color="primary"
                    icon="i-heroicons-paper-airplane-20-solid"
                >
                    Senden
                </UButton>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, watch } from "vue";

const userInput = ref("");
const chatHistory = ref([]);
const isLoading = ref(false);
const chatContainer = ref(null);
const inputField = ref(null);
const showScrollButton = ref(false);
const visibleMessageCount = ref(20);
const hasMoreMessages = computed(
    () => chatHistory.value.length > visibleMessageCount.value
);

const visibleMessages = computed(() => {
    return chatHistory.value.slice(-visibleMessageCount.value);
});

const sendMessage = async () => {
    if (!userInput.value.trim() || isLoading.value) return;

    const userMessage = userInput.value;
    chatHistory.value.push({ role: "user", content: userMessage });
    userInput.value = "";
    isLoading.value = true;

    try {
        const response = await $fetch("/api/chat", {
            method: "POST",
            body: { messages: chatHistory.value },
        });

        const assistantMessage = response.choices[0].message.content;
        chatHistory.value.push({
            role: "assistant",
            content: assistantMessage,
        });
    } catch (error) {
        console.error("Error:", error);
        let errorMessage =
            "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.";

        if (error.response && error.response.status === 429) {
            errorMessage =
                "API-Limit überschritten. Bitte versuchen Sie es später erneut.";
        }

        chatHistory.value.push({
            role: "system",
            content: errorMessage,
        });
    } finally {
        isLoading.value = false;
        await nextTick();
        scrollToBottom();
        focusInput();
    }
};

const isCodeBlock = (content) => {
    return content.startsWith("```") && content.endsWith("```");
};

const formatMessage = (content) => {
    // Ersetze Zeilenumbrüche durch <br>
    content = content.replace(/\n/g, "<br>");

    // Ersetze Markdown-Style Links
    content = content.replace(
        /\[([^\]]+)\]\(([^\)]+)\)/g,
        '<a href="$2" target="_blank" class="text-blue-500 hover:text-blue-700 underline">$1</a>'
    );

    // Ersetze normale URLs, die nicht bereits in Markdown-Style Links umgewandelt wurden
    content = content.replace(
        /(?<!["\(])(https?:\/\/[^\s]+)(?!["\)])/g,
        '<a href="$1" target="_blank" class="text-blue-500 hover:text-blue-700 underline">$1</a>'
    );

    // Ersetze Text zwischen ** mit fetter Schrift
    content = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    return content;
};

const scrollToBottom = () => {
    if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
};

const loadMoreMessages = () => {
    visibleMessageCount.value += 20;
};

const checkScroll = () => {
    if (chatContainer.value) {
        const { scrollTop, scrollHeight, clientHeight } = chatContainer.value;
        showScrollButton.value = scrollTop + clientHeight < scrollHeight - 100;
    }
};

const focusInput = () => {
    if (inputField.value && inputField.value.$el) {
        const inputElement = inputField.value.$el.querySelector("input");
        if (inputElement) {
            inputElement.focus();
        }
    }
};

onMounted(() => {
    scrollToBottom();
    chatContainer.value.addEventListener("scroll", checkScroll);
    focusInput();
});

watch(
    chatHistory,
    () => {
        nextTick(() => {
            scrollToBottom();
        });
    },
    { deep: true }
);
</script>

<style lang="postcss">
.message-content a {
    @apply text-blue-500 hover:text-blue-700 underline;
}

.message-content ul {
    @apply list-disc pl-5 my-2;
}

/* Spezifische Stile für Links in Benutzernachrichten */
.bg-primary-500 .message-content a {
    @apply text-white hover:text-gray-200;
}
</style>
