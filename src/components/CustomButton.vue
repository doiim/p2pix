<template>
    <div class="button-base">
        <div class="button-body"></div>
        <button><slot></slot></button>
    </div>
</template>

<script setup>
</script>

<style scoped>
    .button-base {
        @apply bg-black px-1 pb-1 rounded-3xl relative shadow;
        width: 100%;
    }
    .button-base:before {
        content:"";
        @apply bg-dark-green rounded-3xl absolute inset-1;
    }
    button {
        @apply -translate-y-1 border-2 border-dark-green;
        width:100%;
    }
    button:active {
        transform: translate(0px, 0px);
    }
    button:disabled {
        transform: translate(0px, 0px);
        @apply bg-light-green;
    }
</style>