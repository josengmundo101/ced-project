<template>
  <v-responsive class="pa-10">
    <v-card class="pa-6 rounded-lg elevation-2">
      <div class="d-flex justify-space-between align-center mb-4">
        <v-card-title class="text-h5 font-weight-bold">
          {{ isEdit ? 'Edit Project' : 'Add New Project' }}
        </v-card-title>

        <v-btn rounded flat>
          <RouterLink to="/admin/projects" class="text-decoration-none text-black"
            ><v-icon icon="mdi-arrow-left" start></v-icon> Back to Project List
          </RouterLink>
        </v-btn>
      </div>

      <v-divider></v-divider>

      <v-form @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.project_id" label="Project ID" required />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="form.contract_id" label="Contract ID" />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="form.project_name" label="Project Name" required />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="form.category" label="Category" />
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="form.status"
              :items="['Ongoing', 'Completed', 'Terminated']"
              label="Status"
              required
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="form.region" label="Region" />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="form.lgu" label="LGU" />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="form.department" label="Department" />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="form.implementing_office" label="Implementing Office" />
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="form.implementation_type"
              :items="['Contract', 'By Administration']"
              label="Implementation Type"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="form.contractor" label="Contractor" />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="form.project_engineer" label="Project Engineer" />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="form.year_implemented" label="Year Implemented" type="number" />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="form.amount" label="Amount" type="number" />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="form.revised_amount" label="Revised Amount" type="number" />
          </v-col>

          <v-col cols="12">
            <v-text-field v-model="form.location" label="Location" />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="form.start_date" label="Start Date" type="date" />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="form.end_date" label="End Date" type="date" />
          </v-col>

          <v-col cols="12">
            <v-btn type="submit" color="primary" variant="tonal" rounded>
              {{ isEdit ? 'Update Project' : 'Add Project' }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-responsive>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  projectData: { type: Object, default: () => ({}) },
  mode: { type: String, default: 'add' }, // "add" or "edit"
})

const emit = defineEmits(['submit'])

const form = ref({
  project_id: '',
  contract_id: '',
  project_name: '',
  category: '',
  status: 'Ongoing',
  region: '',
  lgu: '',
  department: '',
  implementing_office: '',
  implementation_type: '',
  contractor: '',
  project_engineer: '',
  year_implemented: new Date().getFullYear(),
  amount: 0,
  revised_amount: 0,
  location: '',
  start_date: '',
  end_date: '',
})

const isEdit = computed(() => props.mode === 'edit')

// preload form if edit mode
watch(
  () => props.projectData,
  (newVal) => {
    if (isEdit.value && newVal) {
      form.value = { ...form.value, ...newVal }
    }
  },
  { immediate: true },
)

function handleSubmit() {
  emit('submit', form.value)
}
</script>
