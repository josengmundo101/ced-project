<template>
  <v-responsive>
    <v-card class="border-sm" color="transparent" flat>
      <div class="table-scroll">
        <v-table density="comfortable" hover class="custom-table">
          <thead>
            <tr>
              <th class="text-uppercase text-center">Contractor ID</th>
              <th class="text-uppercase text-center">Category</th>
              <th class="text-uppercase text-center">Project Name</th>
              <th class="text-uppercase text-center">Location</th>
              <th class="text-uppercase text-center">Status</th>
              <th class="text-uppercase text-center">action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="pa-5 text-center">{{ project.contractor_id }}</td>
              <td class="pa-5 text-center">{{ project.category }}</td>
              <td class="pa-5 text-center">{{ project.project_name }}</td>
              <td class="pa-5 text-center">{{ project.location }}</td>
              <td class="pa-5 text-center">{{ project.status }}</td>

              <td class="pa-5 text-center">
                <v-btn icon size="small" color="transparent" flat class="rounded-xl"
                  ><RouterLink to="projects/view"
                    ><v-icon small class="text-blue">mdi-eye</v-icon></RouterLink
                  ></v-btn
                >
                <v-btn icon size="small" color="transparent" flat class="rounded-xl"
                  ><RouterLink to="projects/edit"
                    ><v-icon small class="text-warning">mdi-pencil</v-icon></RouterLink
                  ></v-btn
                >
                <v-btn icon size="small" color="transparent" flat class="rounded-xl"
                  ><RouterLink>
                    <v-icon small class="text-error">mdi-delete</v-icon></RouterLink
                  ></v-btn
                >
              </td>
            </tr>
          </tbody></v-table
        >
      </div>
    </v-card>
  </v-responsive>
</template>

<script setup>
const project = {
  contractor_id: '',
  category: '',
  project_name: '',
  location: '',
  status: '',
}
</script>

<style scoped>
.table-scroll {
  max-height: 500px; /* adjust based on your layout */
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
