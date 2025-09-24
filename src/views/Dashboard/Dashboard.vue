<script setup>
import CardBox from '../../components/common/CardBox.vue'
import CardGreeting from './component/CardGreeting.vue'
// import RecentProject from '../../components/common/RecentProject.vue'
import GraphChart from '../../components/common/GraphChart.vue'
import DataTable from '@/components/common/DataTable.vue'
</script>

<template>
  <v-responsive class="pa-10">
    <v-row>
      <v-col cols="12" md="7">
        <CardGreeting />
      </v-col>

      <!-- Top Stats -->
      <v-col cols="12" md="5">
        <v-row dense>
          <v-col cols="4">
            <CardBox
              class="pa-2"
              flat
              icon="mdi-check-circle"
              iconColor="green"
              count="50"
              description="Total of Completed Project"
              style="min-height: 220px"
            />
          </v-col>
          <v-col cols="4">
            <CardBox
              class="pa-2"
              flat
              icon="mdi-progress-check"
              iconColor="primary"
              count="20"
              description="Total of Ongoing Project"
              style="min-height: 220px"
            />
          </v-col>
          <v-col cols="4">
            <CardBox
              class="pa-2"
              flat
              icon="mdi-cancel"
              iconColor="red"
              count="5"
              description="Total of Terminated Project"
              style="min-height: 220px"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- Middle Section: Recent Project + Donut Chart -->
    <v-row class="mt-6" dense>
      <v-col cols="12" md="6">
        <DataTable />
      </v-col>
      <v-col cols="12" md="6">
        <v-card
          class="pa-4 border-sm"
          style="min-height: 220px; height: 100%"
          color="transparent"
          flat
        >
          <div class="text-h5 font-weight-bold mb-2">Projects Per Status</div>
          <GraphChart />
        </v-card>
      </v-col>
    </v-row>
  </v-responsive>
</template>
