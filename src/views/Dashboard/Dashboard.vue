<script setup>
import CardBox from '../../components/common/CardBox.vue'
import CardGreeting from './component/CardGreeting.vue'
// import RecentProject from '../../components/common/RecentProject.vue'
import GraphChart from '../../components/common/GraphChart.vue'
import DataTable from '@/components/common/DataTable.vue'
import TableLoader from '@/components/UI/TableLoader.vue'
import { useProjects } from '@/components/composable/useProject'
import { onMounted, computed } from 'vue'

const { fetchProjects, projects, loading } = useProjects()

onMounted(() => {
  fetchProjects()
})
const projectStats = computed(() => {
  const completed = projects.value.filter((p) => p.status === 'completed').length
  const ongoing = projects.value.filter((p) => p.status === 'ongoing').length
  const terminated = projects.value.filter((p) => p.status === 'terminated').length

  return { completed, ongoing, terminated }
})
</script>

<template>
  <v-responsive class="pa-10">
    <v-row>
      <v-col cols="12" md="7">
        <TableLoader :loading="loading" rows="1">
          <CardGreeting />
        </TableLoader>
      </v-col>

      <!-- Top Stats -->
      <v-col cols="12" md="5">
        <v-row dense>
          <v-col cols="4">
            <TableLoader :loading="loading" :rows="3">
              <CardBox
                class="pa-2"
                flat
                icon="mdi-check-circle"
                iconColor="green"
                :count="projects.filter((p) => p.status === 'completed').length"
                description="Total of Completed Project"
                style="min-height: 220px"
              />
            </TableLoader>
          </v-col>
          <v-col cols="4">
            <TableLoader :loading="loading" :rows="3">
              <CardBox
                class="pa-2"
                flat
                icon="mdi-progress-check"
                iconColor="primary"
                :count="projects.filter((p) => p.status === 'ongoing').length"
                description="Total of Ongoing Project"
                style="min-height: 220px"
              />
            </TableLoader>
          </v-col>
          <v-col cols="4">
            <TableLoader :loading="loading" :rows="3">
              <CardBox
                class="pa-2"
                flat
                icon="mdi-cancel"
                iconColor="red"
                :count="projects.filter((p) => p.status === 'terminated').length"
                description="Total of Terminated Project"
                style="min-height: 220px"
              />
            </TableLoader>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- Middle Section: Recent Project + Donut Chart -->
    <v-row class="mt-6" dense>
      <v-col cols="12" md="6">
        <TableLoader :loading="loading" :rows="6">
          <DataTable
            :projects="projects"
            :columns="['name', 'category', 'status', 'date']"
            title="Recent Projects"
          />
        </TableLoader>
      </v-col>
      <v-col cols="12" md="6">
        <TableLoader :loading="loading" :rows="6">
          <v-card
            class="pa-4 border-sm"
            style="min-height: 220px; height: 100%"
            color="transparent"
            flat
          >
            <div class="text-h5 font-weight-bold mb-2">Projects Per Status</div>
            <GraphChart :stats="projectStats" />
          </v-card>
        </TableLoader>
      </v-col>
    </v-row>
  </v-responsive>
</template>
