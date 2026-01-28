<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
  role: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['delete'])

const onDelete = (id) => {
  emit('delete', id)
}
</script>

<template>
  <div class="table-scroll">
    <v-table density="comfortable" hover class="custom-table">
      <thead>
        <tr>
          <th class="text-uppercase text-center">File Name</th>
          <th class="text-uppercase text-center">Category</th>
          <th class="text-uppercase text-center">Version</th>
          <th class="text-uppercase text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="doc in items" :key="doc.id">
          <td class="text-center truncate-text">
            {{ doc.original_name }}
          </td>

          <td class="text-center">
            {{ doc.document_category || '-' }}
          </td>

          <td class="text-center">
            <v-chip size="small" color="success" v-if="doc.is_latest"> v{{ doc.version }} </v-chip>
            <span v-else>v{{ doc.version }}</span>
          </td>

          <td class="text-center">
            <v-btn
              icon="mdi-download"
              size="small"
              variant="text"
              :href="`/api/project-documents/${doc.id}/download`"
            />

            <v-btn
              v-if="role === 1"
              icon="mdi-delete"
              size="small"
              color="error"
              variant="text"
              @click="onDelete(doc.id)"
            />
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<style scoped></style>
