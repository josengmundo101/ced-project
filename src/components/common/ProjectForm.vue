<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  isEdit: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  errors: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['submit'])

// initialize form with arrays for multiple files
const form = ref({
  project_id: '',
  contract_id: '',
  project_name: '',
  category: '',
  region: '',
  lgu: '',
  department: '',
  implementing_office: '',
  fund_source: '',
  implementation_type: '',
  contractor: '',
  project_engineer: '',
  year_implemented: null,
  amount: null,
  revised_amount: null,
  location: '',
  start_date: '',
  end_date: '',
  status: 'ongoing',
  image: [],
  document: [],
  ...props.modelValue,
})

// Watch for changes when editing (important for async loaded project)
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      form.value = {
        ...form.value,
        ...newVal,
        image: [],
        document: [], // reset file inputs
      }
    }
  },
  { immediate: true },
)

function handleSubmit() {
  const payload = { ...form.value }

  // If user didn’t upload new files, remove them from payload
  if (!payload.image.length) delete payload.image
  if (!payload.document.length) delete payload.document

  emit('submit', payload)
}
</script>

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
              :items="['ongoing', 'completed', 'terminated']"
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
            <v-file-input
              label="Project Documents"
              accept=".pdf,.doc,.docx,.xlsx"
              multiple
              clearable
              chips
              prepend-icon="mdi-file-document-multiple"
              :model-value="form.document"
              @update:model-value="
                (newFiles) => {
                  const allFiles = [...form.document, ...newFiles]

                  // Deduplicate by name+size
                  form.document = allFiles.filter(
                    (file, index, self) =>
                      index === self.findIndex((f) => f.name === file.name && f.size === file.size),
                  )
                }
              "
            />
          </v-col>

          <v-col cols="12">
            <v-btn type="submit" color="primary" variant="tonal" :loading="loading" rounded>
              {{ isEdit ? 'Update Project' : 'Add Project' }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-responsive>
</template>
