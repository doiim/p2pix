
<template>
  <div class="hero-gradient">
    {{'./assets/product-logo' + ($route.path == '/' ? '-white':'')+'.png'}}
    <div class="header bg-transparent">
      <img class="product-logo" :src="'/assets/product-logo' + ($route.path == '/' ? '-white':'')+'.png'"/>
    </div>
    <!-- <img alt="Header Image" src="./assets/header.png" class="my-4"/> -->
    <router-view></router-view>
  </div>
</template>


<style scoped>
.hero-gradient{
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

.header{
  padding-top: 24px;
  margin-bottom: 36px;
}
.product-logo{
  margin-left: 40px;
  margin-top: 10px;
}
</style>