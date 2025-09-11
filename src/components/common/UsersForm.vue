<template>
  <v-responsive class="pa-10">
    <v-card class="pa-6 rounded-lg elevation-2">
      <div class="d-flex justify-space-between align-center mb-4">
        <v-card-title class="text-h5 font-weight-bold">
          {{ isEdit ? 'Edit User' : 'Add New User' }}
        </v-card-title>

        <v-btn rounded flat>
          <RouterLink to="/admin/users" class="text-decoration-none text-black"
            ><v-icon icon="mdi-arrow-left" start></v-icon> Back to Users List
          </RouterLink>
        </v-btn>
      </div>
      <v-divider></v-divider>

      <v-card-text>
        <v-form @submit.prevent="handleSubmit" class="d-flex flex-column gap-4">
          <v-text-field
            v-model="form.name"
            label="Full Name"
            variant="outlined"
            density="comfortable"
            prepend-inner-icon="mdi-account"
            required
          />

          <v-text-field
            v-model="form.email"
            label="Email Address"
            type="email"
            variant="outlined"
            density="comfortable"
            prepend-inner-icon="mdi-email"
            required
          />

          <!-- Password only when adding -->
          <v-text-field
            v-if="!isEdit"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            type="password"
            variant="outlined"
            density="comfortable"
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"
            required
          />

          <v-select
            v-model="form.role_id"
            :items="roles"
            item-title="label"
            item-value="id"
            label="User Role"
            variant="outlined"
            density="comfortable"
            prepend-inner-icon="mdi-account-badge"
            required
          />
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-end">
        <v-btn variant="tonal" color="red" @click="resetForm" rounded> Reset </v-btn>
        <v-btn type="submit" variant="tonal" color="blue" @click="handleSubmit" rounded>
          {{ isEdit ? 'Update User' : 'Add User' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-responsive>
</template>

<script setup>
import { reactive, watch, ref } from 'vue'

const showPassword = ref(false) // 👈 for toggle

const props = defineProps({
  modelValue: Object, // existing user (for edit)
  isEdit: Boolean, // edit mode toggle
  roles: Array, // role options
})

const emit = defineEmits(['submit'])

const form = reactive({
  name: '',
  email: '',
  password: '',
  role_id: null,
})

// preload user if editing
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      form.name = val.name
      form.email = val.email
      form.role_id = val.role_id
    }
  },
  { immediate: true },
)

function handleSubmit() {
  emit('submit', { ...form })
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.password = ''
  form.role_id = null
}
</script>

<style scoped></style>
