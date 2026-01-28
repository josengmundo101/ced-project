<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectDocuments } from '@/components/composable/useProjectDocument'
import UploadDocumentDialog from './UploadDocumentDialog.vue'
import { useAuth } from '@/components/composable/useAuth'
import DocumentTable from './DocumentTable.vue'

const route = useRoute()
const projectId = route.params.id

const { currentUser } = useAuth()

const { documents, loading, fetchDocuments, deleteDocument } = useProjectDocuments()

onMounted(() => {
  fetchDocuments(projectId)
})

const handleDelete = async (id) => {
  await deleteDocument(id)
  await fetchDocuments(projectId)
}
</script>

<template>
  <v-card class="mt-6" flat>
    <div class="d-flex justify-space-between align-center mb-4">
      <h3 class="text-h6 font-weight-bold">Documents</h3>

      <UploadDocumentDialog
        v-if="currentUser?.role_id === 1"
        :project-id="projectId"
        @uploaded="fetchDocuments(projectId)"
      />
    </div>

    <DocumentTable
      :items="documents"
      :loading="loading"
      :onDelete="handleDelete"
      :role="currentUser?.role_id"
    />
  </v-card>
</template>

<style scoped>
.truncate-text {
  max-width: 200px;
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.table-scroll {
  max-height: 53vh;
  overflow-y: auto;
}

.custom-table {
  background-color: transparent;
}

.custom-table thead {
  background-color: rgba(46, 46, 46, 0.05);
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
