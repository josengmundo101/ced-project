<script setup>
import logo from '@/assets/ced-logo.png'

const props = defineProps({
  drawer: Boolean,
})
const emit = defineEmits(['update:drawer'])
</script>

<template>
  <v-app-bar color="blue-lighten-1">
    <v-app-bar-nav-icon @click.stop="emit('update:drawer', !props.drawer)" />
    <img :src="logo" alt="" width="50" height="50" class="mx-5" />
    <p class="title text-h4 font-weight-bold">City Engineering Department</p>
  </v-app-bar>
</template>

<style scoped>
.title {
  letter-spacing: 2px !important;
}
</style>
