<template>
  <div id="app" class="bg-light h-screen">
    <Navigation />
    <RouterView />
  </div>
</template>

<script>
import Navigation from "@/components/Navbar.vue";

export default {
  components: {
    Navigation
  }
};
</script>

<style>
.h-screen {
  height: 100vh;
}
</style>
