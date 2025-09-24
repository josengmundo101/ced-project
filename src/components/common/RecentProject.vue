<script setup>
const recentProjects = [
  {
    id: 1,
    name: 'City Road Repair',
    category: 'Infrastructure',
    status: 'Completed',
    date: '2025-09-01',
  },
  {
    id: 2,
    name: 'New Health Center',
    category: 'Healthcare',
    status: 'In Progress',
    date: '2025-08-28',
  },
  {
    id: 3,
    name: 'School Renovation',
    category: 'Education',
    status: 'Pending',
    date: '2025-08-20',
  },
  {
    id: 4,
    name: 'Flood Control System',
    category: 'Disaster Management',
    status: 'In Progress',
    date: '2025-08-15',
  },
  {
    id: 5,
    name: 'Public Park Upgrade',
    category: 'Community',
    status: 'Completed',
    date: '2025-08-10',
  },
]
</script>

<template>
  <v-card class="border-sm rounded-lg" height="100%" color="transparent" flat>
    <v-card-title class="text-h5 my-2 font-weight-bold mb-2">Recent Projects</v-card-title>

    <!-- Scrollable container -->
    <div class="table-scroll">
      <v-table class="custom-table" hover density="comfortable">
        <thead>
          <tr>
            <th class="pa-5">Project Name</th>
            <th class="pa-5">Category</th>
            <th class="pa-5">Status</th>
            <th class="pa-5">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in recentProjects" :key="project.id">
            <td class="pa-5 font-weight-medium">{{ project.name }}</td>
            <td class="pa-5">{{ project.category }}</td>
            <td class="pa-5">
              <v-chip
                :color="
                  project.status === 'Completed'
                    ? 'green'
                    : project.status === 'In Progress'
                      ? 'blue'
                      : 'orange'
                "
                text-color="white"
                size="small"
              >
                {{ project.status }}
              </v-chip>
            </td>
            <td class="pa-5">{{ project.date }}</td>
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
  background-color: rgba(46, 46, 46, 0.05); /* soft separation */
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
