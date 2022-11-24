<script setup>
import { logout } from '../services/keycloak'
</script>
<template>
  <main>
    <button @click="logout">logout</button>
  </main>
</template>
