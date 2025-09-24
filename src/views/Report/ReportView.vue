<script setup lang="ts">
import FilterBar from './component/FilterBar.vue'
import CardBox from '@/components/common/CardBox.vue'
import GraphChart from '@/components/common/GraphChart.vue'
import DataTable from '../../components/common/DataTable.vue'
import TableLoader from '@/components/UI/TableLoader.vue'
import { useProjects } from '@/components/composable/useProject'
import { ref, onMounted } from 'vue'

const { fetchProjects, projects, loading } = useProjects()

onMounted(() => {
  fetchProjects()
})
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

    <FilterBar />

    <v-row>
      <v-col cols="12" md="3" class="mt-6">
        <CardBox
          class="pa-2"
          flat
          icon="mdi-file-chart"
          iconColor="blue"
          :count="projects.length"
          description="Total Project"
        />
      </v-col>
      <v-col cols="12" md="3" class="mt-6">
        <CardBox
          class="pa-2"
          flat
          icon="mdi-check-circle"
          iconColor="green"
          :count="projects.filter((p) => p.status === 'completed').length"
          description="Total Completed Project"
        />
      </v-col>
      <v-col cols="12" md="3" class="mt-6">
        <CardBox
          class="pa-2"
          flat
          icon="mdi-progress-check"
          iconColor="blue"
          :count="projects.filter((p) => p.status === 'ongoing').length"
          description="Total Ongoing Project"
        />
      </v-col>
      <v-col cols="12" md="3" class="mt-6">
        <CardBox
          class="pa-2"
          flat
          icon="mdi-cancel"
          iconColor="red"
          :count="projects.filter((p) => p.status === 'terminated').length"
          description="Total Terminated Project"
        />
      </v-col>
    </v-row>

    <v-row class="mt-6" dense>
      <v-col cols="12">
        <v-card class="pa-4 border-sm" flat style="min-height: 220px; height: 100%">
          <GraphChart />
        </v-card>
      </v-col>

      <v-col cols="12" class="mt-6">
        <TableLoader :loading="loading" :rows="6">
          <DataTable
            :projects="projects"
            :columns="['name', 'category', 'status', 'date', 'action']"
            title="Project Report"
          />
        </TableLoader>
      </v-col>
    </v-row>
  </v-responsive>
</template>
