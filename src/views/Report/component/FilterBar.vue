<template>
  <v-responsive>
    <v-card flat class="pa-4 mb-6 border-sm rounded-lg">
      <v-row dense>
        <!-- Year -->
        <v-col cols="12" md="2">
          <v-select
            v-model="filters.year"
            :items="years"
            label="Year"
            density="comfortable"
            variant="outlined"
            hide-details
          />
        </v-col>

        <!-- Status -->
        <v-col cols="12" md="2">
          <v-select
            v-model="filters.status"
            :items="statuses"
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
            :items="categories"
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
            v-model="filters.choices"
            :items="choices"
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

<script setup>
import { ref } from 'vue'

// Filters state
const filters = ref({
  year: null,
  status: null,
  category: null,
  region: null,
})

// Dropdown data
const years = [2024, 2025, 2026]
const statuses = ['Ongoing', 'Completed', 'Terminated']
const categories = ['Road', 'Bridge', 'School', 'Hospital', 'Housing']
const choices = ['Contract', 'Admin']

// Methods
const applyFilters = () => {
  console.log('Filters applied:', filters.value)
  // Call API or filter table data here
}
const resetFilters = () => {
  filters.value = {
    year: null,
    month: null,
    status: null,
    category: null,
    region: null,
  }
}
</script>

<style scoped></style>
