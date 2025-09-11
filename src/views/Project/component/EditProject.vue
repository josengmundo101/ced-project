<template>
  <v-responsive>
    <ProjectForm mode="edit" :projectData="project" @submit="updateProject" />
  </v-responsive>
</template>

<script setup>
import ProjectForm from '@/components/common/ProductForm.vue'
</script>
