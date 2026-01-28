<script setup>
import { ref } from 'vue'
import { useProjectDocuments } from '@/components/composable/useProjectDocument'

const props = defineProps({
  projectId: {
    type: [String, Number],
    required: true,
  },
})

const emit = defineEmits(['uploaded'])

const dialog = ref(false)
const file = ref(null)
const documentCategory = ref('')
const remarks = ref('')
const submitting = ref(false)

const { uploadDocument } = useProjectDocuments()

const resetForm = () => {
  file.value = null
  documentCategory.value = ''
  remarks.value = ''
}

const submit = async () => {
  if (!file.value) return

  submitting.value = true

  try {
    const formData = new FormData()
    formData.append('file', file.value)
    formData.append('document_category', documentCategory.value)
    formData.append('remarks', remarks.value)

    await uploadDocument(props.projectId, formData)

    emit('uploaded')
    dialog.value = false
    resetForm()
  } catch (error) {
    console.error('Upload failed:', error)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <!-- Trigger Button -->
  <v-btn color="primary" @click="dialog = true"> Upload Document </v-btn>

  <!-- Dialog -->
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="font-weight-bold"> Upload Project Document </v-card-title>

      <v-card-text>
        <v-file-input
          v-model="file"
          label="Select file"
          prepend-icon="mdi-paperclip"
          show-size
          accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg"
          required
        />

        <v-text-field
          v-model="documentCategory"
          label="Document Category"
          placeholder="e.g. Contract, Invoice, Report"
          class="mt-3"
        />

        <v-textarea v-model="remarks" label="Remarks" rows="3" class="mt-3" />
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn text @click="dialog = false">Cancel</v-btn>
        <v-btn color="primary" :loading="submitting" :disabled="!file" @click="submit">
          Upload
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
