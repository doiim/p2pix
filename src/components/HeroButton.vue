<template>
    <button class="hero-button mt-4 border-2 border-white text-white opacity-70"><slot></slot></button>
</template>

<script setup>
</script>

<style>
    .hero-button a{
        text-decoration: none!important ;
        color: white!important ;
    }
    .hero-button{
        background: transparent;
        background-color: transparent;
        background-image: none;
        }
    .hero-button:active {
        transform: translate(0px, 0px);
    }
    .hero-button:disabled {
        transform: translate(0px, 0px);
        @apply bg-light-green border-light-green;
    }
</style>