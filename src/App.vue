<template>
  <v-app>
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
    <WhatsAppButton />
  </v-app>
</template>

<style></style>

<script setup>
import WhatsAppButton from './components/WhatsAppButton.vue'
</script>