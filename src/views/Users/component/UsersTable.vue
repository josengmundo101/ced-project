<template>
  <v-responsive>
    <v-card class="border-sm" color="transparent" flat>
      <div class="table-scroll">
        <v-table density="comfortable" hover class="custom-table">
          <thead>
            <tr>
              <th class="text-uppercase text-center">Id</th>
              <th class="text-uppercase text-center">Name</th>
              <th class="text-uppercase text-center">email</th>
              <th class="text-uppercase text-center">role</th>
              <th class="text-uppercase text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in products" :key="index">
              <td class="pa-5 text-center">{{ item.Id }}</td>
              <td class="pa-5 text-center">{{ item.Name }}</td>
              <td class="pa-5 text-center">{{ item.Email }}</td>
              <td class="pa-5 text-center">{{ item.Role }}</td>

              <td class="pa-5 text-center">
                <v-btn icon size="small" color="transparent" flat class="rounded-xl"
                  ><RouterLink to="users/edit"
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
          </tbody>
        </v-table>
      </div>
    </v-card>
  </v-responsive>
</template>

<script setup>
import { ref } from 'vue'

const products = ref([
  {
    Id: 1,
    Name: 'Joseph',
    Email: 'jlquinte1901@gmail.com',
    Role: 'super admin',
  },
  {
    Id: 2,
    Name: 'Lucilo',
    Email: 'lucilo@gmail.com',
    Role: 'admin',
  },
  {
    Id: 3,
    Name: 'Quinte',
    Email: 'quinte@gmail.com',
    Role: 'admin',
  },
  {
    Id: 4,
    Name: 'Espa',
    Email: 'espa@gmail.com',
    Role: 'user',
  },
  // Add more products as needed
])
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
