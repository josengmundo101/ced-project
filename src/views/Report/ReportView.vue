<script setup>
import FilterBar from './component/FilterBar.vue'
import CardBox from '@/components/common/CardBox.vue'
import GraphChart from '@/components/common/GraphChart.vue'
import DataTable from '../../components/common/DataTable.vue'
import TableLoader from '@/components/UI/TableLoader.vue'
import { useProjects } from '@/components/composable/useProject'
import { onMounted, computed, ref } from 'vue'

const { fetchProjects, projects, loading } = useProjects()

onMounted(() => {
  fetchProjects()
})

// keep track of selected filters
const filters = ref({
  year_implemented: null,
  status: null,
  category: null,
  implementationType: null,
})

// apply filtering
const filteredProjects = computed(() => {
  return projects.value.filter((p) => {
    return (
      (!filters.value.year_implemented || p.year_implemented === filters.value.year_implemented) &&
      (!filters.value.status || p.status === filters.value.status) &&
      (!filters.value.category || p.category === filters.value.category) &&
      (!filters.value.implementationType ||
        p.implementation_type === filters.value.implementationType)
    )
  })
})

// stats will also follow filters
const projectStats = computed(() => {
  const completed = filteredProjects.value.filter((p) => p.status === 'completed').length
  const ongoing = filteredProjects.value.filter((p) => p.status === 'ongoing').length
  const terminated = filteredProjects.value.filter((p) => p.status === 'terminated').length

  return { completed, ongoing, terminated }
})

// handle filter bar actions
const applyFilters = (f) => {
  filters.value = f
}
const resetFilters = () => {
  filters.value = {}
}
</script>

<template>
  <v-responsive class="pa-10">
    <div class="mt-6 mb-8">
      <h1 class="text-h4 font-weight-bold fade-in delay-50">Reports</h1>
      <p class="text-body-2 text-grey-darken-1 mt-2 fade-in delay-100">
        This section provides an overview of various reports and analytics related to the system's
        performance and user activities.
      </p>
    </div>

    <!-- FilterBar gets dropdown values from API projects -->
    <FilterBar
      :year_implemented="[...new Set(projects.map((p) => p.year_implemented))]"
      :statuses="[...new Set(projects.map((p) => p.status))]"
      :categories="[...new Set(projects.map((p) => p.category))]"
      :implementationType="[...new Set(projects.map((p) => p.implementation_type))]"
      @apply="applyFilters"
      @reset="resetFilters"
    />

    <v-row>
      <v-col cols="12" md="3" class="mt-6">
        <TableLoader :loading="loading" :rows="2">
          <CardBox
            class="pa-2"
            flat
            icon="mdi-file-chart"
            iconColor="blue"
            :count="filteredProjects.length"
            description="Total Project"
          />
        </TableLoader>
      </v-col>
      <v-col cols="12" md="3" class="mt-6">
        <TableLoader :loading="loading" :rows="2">
          <CardBox
            class="pa-2"
            flat
            icon="mdi-check-circle"
            iconColor="green"
            :count="projectStats.completed"
            description="Total Completed Project"
          />
        </TableLoader>
      </v-col>
      <v-col cols="12" md="3" class="mt-6">
        <TableLoader :loading="loading" :rows="2">
          <CardBox
            class="pa-2"
            flat
            icon="mdi-progress-check"
            iconColor="blue"
            :count="projectStats.ongoing"
            description="Total Ongoing Project"
          />
        </TableLoader>
      </v-col>
      <v-col cols="12" md="3" class="mt-6">
        <TableLoader :loading="loading" :rows="2">
          <CardBox
            class="pa-2"
            flat
            icon="mdi-cancel"
            iconColor="red"
            :count="projectStats.terminated"
            description="Total Terminated Project"
          />
        </TableLoader>
      </v-col>
    </v-row>

    <v-row class="mt-6" dense>
      <v-col cols="12">
        <TableLoader :loading="loading" :rows="6">
          <v-card class="pa-4 border-sm" flat style="min-height: 220px; height: 100%">
            <GraphChart :stats="projectStats" />
          </v-card>
        </TableLoader>
      </v-col>

      <v-col cols="12" class="mt-6">
        <TableLoader :loading="loading" :rows="6">
          <DataTable
            :projects="filteredProjects"
            :columns="['name', 'category', 'status', 'implementation_type', 'date', 'action']"
            title="Project Report"
          />
        </TableLoader>
      </v-col>
    </v-row>
  </v-responsive>
</template>
