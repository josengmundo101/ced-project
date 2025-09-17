<template>
  <v-responsive>
    <v-card class="border-sm" color="transparent" flat>
      <div class="table-scroll">
        <v-table density="comfortable" hover class="custom-table">
          <thead>
            <tr>
              <th class="text-uppercase text-center">Id</th>
              <th class="text-uppercase text-center">Name</th>
              <th class="text-uppercase text-center">Email</th>
              <th class="text-uppercase text-center">Role</th>
              <th class="text-uppercase text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td class="text-center">{{ item.id }}</td>
              <td class="text-center">{{ item.name }}</td>
              <td class="text-center">{{ item.email }}</td>
              <td class="text-center">{{ item.rolelabel || 'N/A' }}</td>
              <td class="text-center">
                <RouterLink :to="`/admin/users/edit/${item.id}`" class="mr-2">
                  <v-btn icon size="small" flat class="rounded-xl">
                    <v-icon small class="text-primary">mdi-pencil</v-icon>
                  </v-btn>
                </RouterLink>
                <v-btn
                  icon
                  size="small"
                  flat
                  class="rounded-xl"
                  :disabled="loading"
                  @click="() => onDelete(item.id)"
                >
                  <v-icon small class="text-error">mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-card>
  </v-responsive>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  onDelete: { type: Function, required: true },
})
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
