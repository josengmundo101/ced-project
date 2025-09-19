<template>
  <v-responsive class="pa-10">
    <v-card class="pa-6 rounded-lg elevation-2">
      <!-- Header -->
      <div class="d-flex justify-space-between align-center mb-4">
        <v-card-title class="text-h5 font-weight-bold">
          {{ isEdit ? 'Edit Project' : 'Add New Project' }}
        </v-card-title>

        <RouterLink to="/admin/projects" class="text-decoration-none">
          <v-btn rounded flat>
            <v-icon icon="mdi-arrow-left" start></v-icon>
            Back to Project List
          </v-btn>
        </RouterLink>
      </div>

      <v-divider />

      <!-- Form -->
      <v-form @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.project_id"
              label="Project ID"
              :error-messages="errors.project_id"
              required
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.contract_id"
              label="Contract ID"
              :error-messages="errors.contract_id"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.project_name"
              label="Project Name"
              :error-messages="errors.project_name"
              required
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.category"
              label="Category"
              :error-messages="errors.category"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="form.status"
              :items="['ongoing', 'completed', 'terminated']"
              label="Status"
              :error-messages="errors.status"
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
            <v-text-field v-model="form.fund_source" label="Fund Source" />
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

          <v-col cols="12" md="6">
            <v-text-field v-model="form.location" label="Location" />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="form.start_date" label="Start Date" type="date" />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="form.end_date" label="End Date" type="date" />
          </v-col>

          <v-col cols="12" md="6">
            <v-file-input
              v-model="form.image"
              label="Project Image"
              accept="image/*"
              clearable
              chips
            />
          </v-col>

          <v-col cols="12">
            <v-file-input
              v-model="form.document"
              label="Project Document"
              accept=".pdf,.doc,.docx,.xlsx"
              clearable
              chips
            />
          </v-col>

          <v-col cols="12">
            <v-btn type="submit" color="primary" variant="tonal" rounded :loading="loading">
              {{ isEdit ? 'Update Project' : 'Add Project' }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-responsive>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  isEdit: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  errors: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['submit'])

// form state
const form = ref({})

// ensure form updates when parent passes data (important for async fetch)
watch(
  () => props.modelValue,
  (newVal) => {
    form.value = { ...newVal }
  },
  { immediate: true, deep: true },
)

function handleSubmit() {
  emit('submit', form.value)
}
</script>
