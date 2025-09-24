<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProjects } from '@/components/composable/useProject'
import TableLoader from '@/components/UI/TableLoader.vue'

const route = useRoute()
const { getProject, loading, error } = useProjects()
const project = ref(null)

onMounted(async () => {
  try {
    const res = await getProject(route.params.id)

    // Parse image/document paths if they are JSON strings
    project.value = {
      ...res,
      image_path: Array.isArray(res.image_path)
        ? res.image_path
        : JSON.parse(res.image_path || '[]'),
      document_path: Array.isArray(res.document_path)
        ? res.document_path
        : JSON.parse(res.document_path || '[]'),
    }
  } catch (err) {
    console.error('Failed to load project:', err)
  }
})
</script>

<template>
  <v-responsive class="pa-10">
    <!-- Header -->
    <div class="mt-6 mb-8">
      <h1 class="text-h4 font-weight-bold">Project Details</h1>
      <p class="text-body-2 text-grey-darken-1 mt-2">
        The Project Details shows you the full information of this project.
      </p>
    </div>

    <!-- Loading / Error -->
    <v-alert v-if="error" type="error" class="mb-4">{{ error }}</v-alert>
    <TableLoader :loading="loading" :rows="6" />

    <!-- Details -->
    <v-card v-if="project" class="rounded-lg elevation-2" flat color="transparent">
      <div class="table-scroll">
        <v-table class="custom-table" density="comfortable">
          <tbody>
            <tr>
              <th class="pa-3 text-right">Project ID</th>
              <td class="pa-3">{{ project.project_id }}</td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Contract ID</th>
              <td class="pa-3">{{ project.contract_id || 'N/A' }}</td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Project Name</th>
              <td class="pa-3">{{ project.project_name }}</td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Category</th>
              <td class="pa-3">{{ project.category || 'N/A' }}</td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Status</th>
              <td class="pa-3">
                <v-chip
                  :color="
                    project.status === 'completed'
                      ? 'green'
                      : project.status === 'ongoing'
                        ? 'blue'
                        : 'red'
                  "
                  text-color="white"
                  size="small"
                >
                  {{ project.status }}
                </v-chip>
              </td>
            </tr>

            <tr>
              <th class="pa-3 text-right">Region</th>
              <td class="pa-3">{{ project.region || 'N/A' }}</td>
            </tr>
            <tr>
              <th class="pa-3 text-right">LGU</th>
              <td class="pa-3">{{ project.lgu || 'N/A' }}</td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Department</th>
              <td class="pa-3">{{ project.department || 'N/A' }}</td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Implementing Office</th>
              <td class="pa-3">{{ project.implementing_office || 'N/A' }}</td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Fund Source</th>
              <td class="pa-3">
                {{ project.fund_source ? `$${project.fund_source.toLocaleString()}` : 'N/A' }}
              </td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Implementation Type</th>
              <td class="pa-3">{{ project.implementation_type || 'N/A' }}</td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Contractor</th>
              <td class="pa-3">{{ project.contractor || 'N/A' }}</td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Project Engineer</th>
              <td class="pa-3">{{ project.project_engineer || 'N/A' }}</td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Year Implemented</th>
              <td class="pa-3">
                {{
                  project.year_implemented ? `$${project.year_implemented.toLocaleString()}` : 'N/A'
                }}
              </td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Amount</th>
              <td class="pa-3">
                {{ project.amount ? `$${project.amount.toLocaleString()}` : 'N/A' }}
              </td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Revised Amount</th>
              <td class="pa-3">
                {{ project.revised_amount ? `$${project.revised_amount.toLocaleString()}` : 'N/A' }}
              </td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Location</th>
              <td class="pa-3">{{ project.location || 'N/A' }}</td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Start Date</th>
              <td class="pa-3">
                {{ project.start_date ? new Date(project.start_date).toLocaleDateString() : 'N/A' }}
              </td>
            </tr>
            <tr>
              <th class="pa-3 text-right">End Date</th>
              <td class="pa-3">
                {{ project.end_date ? new Date(project.end_date).toLocaleDateString() : 'N/A' }}
              </td>
            </tr>

            <tr>
              <th class="pa-3 text-right">Created By</th>
              <td class="pa-3">
                {{ project.creator?.name || 'N/A' }}
              </td>
            </tr>

            <!-- Images -->
            <tr>
              <th class="pa-3 text-right">Images</th>
              <td class="pa-3">
                <div v-if="project.image_path && project.image_path.length">
                  <v-avatar v-for="(img, i) in project.image_path" :key="i" size="50" class="ma-1">
                    <v-img :src="img" alt="Project Image" />
                  </v-avatar>
                </div>
                <span v-else class="text-grey">No Images</span>
              </td>
            </tr>

            <!-- Documents -->
            <tr>
              <th class="pa-3 text-right">Documents</th>
              <td class="pa-3">
                <div v-if="project.document_path && project.document_path.length">
                  <div v-for="(doc, i) in project.document_path" :key="i" class="mb-1">
                    <a :href="doc" target="_blank" class="text-blue text-decoration-none">
                      Document {{ i + 1 }}
                    </a>
                  </div>
                </div>
                <span v-else class="text-grey">No Documents</span>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-card>
    <RouterLink to="/admin/projects">
      <v-btn text color="primary" class="mt-4">Back </v-btn>
    </RouterLink>
  </v-responsive>
</template>

<style scoped>
.table-scroll {
  overflow-x: auto;
  max-width: 100%;
}

.custom-table th {
  color: #151515;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  font-weight: 600;
}

.custom-table td {
  font-size: 0.9rem;
  vertical-align: middle;
}
</style>
