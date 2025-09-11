<script setup>
import SearchBar from '@/components/SearchBar.vue'
import UsersList from './component/UsersTable.vue'
</script>

<template>
  <v-responsive class="pa-10">
    <div class="mt-6 mb-8">
      <h1 class="text-h4 font-weight-bold fade-in delay-50">Users List</h1>
      <p class="text-body-2 text-grey-darken-1 mt-2 fade-in delay-100">
        The user list effectively dictates user presentation and provides space to list your users
        and offering in the most appealing way.
      </p>
    </div>

    <v-row class="mb-4">
      <v-col cols="12" sm="6">
        <SearchBar v-model="searchQuery" placeholder="Search by name..." />
      </v-col>

      <v-col cols="12" sm="6" class="d-flex justify-end align-center">
        <RouterLink to="users/add"
          ><v-btn
            class="btn text-subtitle-1 font-weight-regular rounded-lg text-none"
            color="primary"
            ><v-icon icon="mdi-account" start></v-icon>Add User</v-btn
          ></RouterLink
        >
      </v-col>
    </v-row>

    <div class="mb-5">
      <!-- Project Table Component -->
      <UsersList />
    </div>
  </v-responsive>
</template>
