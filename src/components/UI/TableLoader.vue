<!-- src/components/UI/TableLoader.vue -->
<template>
  <div>
    <!-- Show skeletons while loading -->
    <div v-if="loading" class="pa-4">
      <v-skeleton-loader
        v-for="n in rows"
        :key="n"
        type="text"
        class="mb-2"
        width="100%"
        max-width="100%"
      />
    </div>

    <!-- Otherwise show actual table -->
    <slot v-else></slot>
  </div>
</template>

<script setup>
defineProps({
  loading: { type: Boolean, default: false },
  rows: { type: Number, default: 5 }, // skeleton rows
})
</script>
