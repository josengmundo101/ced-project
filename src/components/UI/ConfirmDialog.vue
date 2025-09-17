<!-- ConfirmDialog.vue -->
<script setup>
const props = defineProps({
  dialog: { type: Boolean, required: true },
  title: { type: String, default: 'Confirm Action' },
  message: { type: String, default: 'Are you sure you want to proceed?' },
  confirmText: { type: String, default: 'Confirm' },
  cancelText: { type: String, default: 'Cancel' },
  confirmColor: { type: String, default: 'primary' },
  loading: { type: Boolean, default: false },
  snackbar: { type: Object, default: () => ({ show: false, message: '', color: 'success' }) },
})

const emit = defineEmits(['update:dialog', 'confirm', 'update:snackbar'])

const closeDialog = () => {
  emit('update:dialog', false)
}

const confirmAction = () => {
  emit('confirm')
}

const closeSnackbar = () => {
  emit('update:snackbar', { ...props.snackbar, show: false })
}
</script>

<template>
  <div>
    <!-- Confirmation Dialog -->
    <v-dialog
      v-model="props.dialog"
      max-width="400"
      @update:model-value="emit('update:dialog', $event)"
    >
      <v-card>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>{{ message }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog">{{ cancelText }}</v-btn>
          <v-btn :color="confirmColor" :loading="loading" @click="confirmAction">
            {{ confirmText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar
      v-model="props.snackbar.show"
      :color="props.snackbar.color"
      timeout="3000"
      @update:model-value="closeSnackbar"
    >
      {{ props.snackbar.message }}
      <template v-slot:actions>
        <v-btn text @click="closeSnackbar">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
