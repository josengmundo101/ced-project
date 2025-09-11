<template>
  <v-responsive>
    <ProjectForm mode="add" @submit="handleAddProject" />
  </v-responsive>
</template>

<script setup>
import ProjectForm from '@/components/common/ProductForm.vue'
</script>
