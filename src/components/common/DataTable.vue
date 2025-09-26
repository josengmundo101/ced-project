<script setup>
import { defineProps, defineEmits } from 'vue'

// Props
const props = defineProps({
  projects: {
    type: Array,
    required: true,
    default: () => [],
  },
  // Default columns (can override from parent)
  columns: {
    type: Array,
    default: () => ['name', 'category', 'status', 'date'],
    validator: (cols) =>
      cols.every((col) =>
        ['name', 'category', 'status', 'implementation_type', 'date', 'action'].includes(col),
      ),
  },
  title: {
    type: String,
    default: '',
  },
})

// Column labels (human readable)
const columnLabels = {
  name: 'Project Name',
  category: 'Category',
  status: 'Status',
  implementation_type: 'Implementation Type',
  date: 'Date',
  action: 'Action',
}

// Status → chip colors
const statusColors = {
  completed: 'green',
  ongoing: 'blue',
  terminated: 'red',
}

// Emit for parent actions
const emit = defineEmits(['view-project'])
</script>

<template>
  <TableLoader :loading="loading" :rows="6" />
  <v-card class="border-sm rounded-lg" height="100%" color="transparent" flat>
    <!-- Optional title -->
    <v-card-title v-if="title" class="text-h5 font-weight-bold mb-2">
      {{ title }}
    </v-card-title>

    <div class="table-scroll">
      <v-table class="custom-table" hover density="comfortable">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col" class="pa-5">
              {{ columnLabels[col] }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="project in projects" :key="project.id">
            <td v-if="columns.includes('name')" class="pa-5 font-weight-medium">
              {{ project.project_name }}
            </td>
            <td v-if="columns.includes('category')" class="pa-5">
              {{ project.category }}
            </td>
            <td v-if="columns.includes('status')" class="pa-5">
              <v-chip
                :color="statusColors[project.status] || 'grey'"
                text-color="white"
                size="small"
              >
                {{ project.status }}
              </v-chip>
            </td>
            <td v-if="columns.includes('implementation_type')" class="pa-5">
              {{ project.implementation_type }}
            </td>
            <td v-if="columns.includes('date')" class="pa-5">
              {{ project.year_implemented }}
            </td>
            <td v-if="columns.includes('action')" class="pa-5">
              <v-btn icon size="small" flat class="rounded-xl">
                <RouterLink :to="`/admin/projects/view/${project.id}`">
                  <v-icon small class="text-blue">mdi-eye</v-icon>
                </RouterLink>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </v-card>
</template>

<style scoped>
.table-scroll {
  max-height: 300px;
  overflow-y: auto;
}

.custom-table {
  background-color: transparent;
}

.custom-table thead {
  background-color: rgba(46, 46, 46, 0.05);
}

.custom-table th {
  text-transform: uppercase;
  font-weight: 900;
  color: #151515;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.custom-table td {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
</style>
