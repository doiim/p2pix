<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="hero-gradient">
    <!-- <img alt="Header Image" src="./assets/header.png" class="my-4"/> -->
    <HelloWorld />
  </div>
</template>

<style scoped>
.hero-gradient{
  padding-top: 72px;
  background: linear-gradient(215deg, #f59e0b, #1dad9d, #1dad9d);
  background-size: 400% 400%;
}
.hero-gradient.on {
  -webkit-animation: HeroGradient 5s ease infinite;
  -moz-animation: HeroGradient 5s ease infinite;
  animation: HeroGradient 5s ease infinite;
}
.hero-gradient.off {
  -webkit-animation: HeroGradientOff 0.6s ease;
  -moz-animation: HeroGradientOff 0.6s ease;
  animation: HeroGradientOff 0.6s ease;
}

@-webkit-keyframes HeroGradient {0%{background-position:0% 100%}50%{background-position:20% 80%}100%{background-position:0% 100%}}
@-moz-keyframes HeroGradient {0%{background-position:0% 100%}50%{background-position:20% 80%}100%{background-position:0% 100%}}
@keyframes HeroGradient {0%{background-position:0% 100%}50%{background-position:20% 80%}100%{background-position:0% 100%}}

@-webkit-keyframes HeroGradientOff {0%{background-position:0% 100%}100%{background-position:100% 0%}}
@-moz-keyframes HeroGradientOff {0%{background-position:0% 100%}100%{background-position:100% 0%}}
@keyframes HeroGradientOff {0%{background-position:0% 100%}100%{background-position:100% 0%}}

</style>