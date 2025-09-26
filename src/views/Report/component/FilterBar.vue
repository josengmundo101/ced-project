<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  year_implemented: { type: Array, default: () => [] },
  statuses: { type: Array, default: () => [] },
  categories: { type: Array, default: () => [] },
  implementationType: { type: Array, default: () => [] },
})

const emit = defineEmits(['apply', 'reset'])

const filters = ref({
  year_implemented: null,
  status: null,
  category: null,
  implementationType: null,
})

const applyFilters = () => {
  emit('apply', { ...filters.value })
}
const resetFilters = () => {
  filters.value = {
    year_implemented: null,
    status: null,
    category: null,
    implementation_type: null,
  }
  emit('reset', { ...filters.value })
}
</script>

<template>
  <v-responsive class="fade-in delay-100">
    <v-card flat class="pa-4 mb-6 border-sm rounded-lg">
      <v-row dense>
        <!-- Year -->
        <v-col cols="12" md="2">
          <v-select
            v-model="filters.year_implemented"
            :items="props.year_implemented"
            label="Year"
            density="comfortable"
            variant="outlined"
            hide-details
            clearable
          />
        </v-col>

        <!-- Status -->
        <v-col cols="12" md="2">
          <v-select
            v-model="filters.status"
            :items="props.statuses"
            label="Status"
            density="comfortable"
            variant="outlined"
            hide-details
            clearable
          />
        </v-col>

        <!-- Category -->
        <v-col cols="12" md="3">
          <v-select
            v-model="filters.category"
            :items="props.categories"
            label="Category"
            density="comfortable"
            variant="outlined"
            hide-details
            clearable
          />
        </v-col>

        <!-- Contract / Admin -->
        <v-col cols="12" md="3">
          <v-select
            v-model="filters.implementationType"
            :items="props.implementationType"
            label="Contract / Admin"
            density="comfortable"
            variant="outlined"
            hide-details
            clearable
          />
        </v-col>

        <v-col class="d-flex align-center ml-3">
          <v-btn size="small" color="primary" @click="applyFilters" class="mr-2">Apply</v-btn>
          <v-btn size="small" variant="outlined" color="grey" @click="resetFilters">Reset</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-responsive>
</template>
