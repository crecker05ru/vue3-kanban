<script setup>
import Main from './components/Main.vue'
</script>

<template>
  <header class="flex">
    <img alt="Vue logo" class="ml-auto mr-auto mt-4 mb-12" src="./assets/logo.svg" width="125" height="125" />
    <div class="">
    </div>
  </header>

  <main>
    <Main />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
