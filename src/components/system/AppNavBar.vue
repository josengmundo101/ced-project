<script setup>
import logo from '@/assets/ced-logo.png'

const props = defineProps({
  drawer: Boolean,
})
const emit = defineEmits(['update:drawer'])
</script>

<template>
  <v-app-bar color="blue-lighten-1">
    <v-app-bar-nav-icon @click.stop="emit('update:drawer', !props.drawer)" class="ml-5" />
    <img :src="logo" alt="" width="50" height="50" class="mx-2" />
    <p class="title text-h5 font-weight-bold">City Engineering Department</p>
  </v-app-bar>
</template>

<style scoped></style>
