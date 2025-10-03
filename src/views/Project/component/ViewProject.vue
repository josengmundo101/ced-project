<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProjects } from '@/components/composable/useProject'
import TableLoader from '@/components/UI/TableLoader.vue'
import { useAuth } from '@/components/composable/useAuth'

const route = useRoute()
const { getProject, loading, error } = useProjects()
const { currentUser } = useAuth()
const project = ref(null)

// compute back route based on role
const viewPath = computed(() => {
  if (!currentUser.value) return { name: 'login' }

  return currentUser.value.role_id === 1 ? { name: 'admin-projects' } : { name: 'user-projects' }
})

onMounted(async () => {
  try {
    const res = await getProject(route.params.id)

    project.value = {
      ...res,
      image_urls: res.image_urls || [],
      document_urls: res.document_urls || [],
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
              <th class="pa-3 text-right">Project ID:</th>
              <td class="pa-3">{{ project.project_id }}</td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Contract ID:</th>
              <td class="pa-3">{{ project.contract_id || 'N/A' }}</td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Project Name:</th>
              <td class="pa-3">{{ project.project_name }}</td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Category:</th>
              <td class="pa-3">{{ project.category || 'N/A' }}</td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Status:</th>
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
              <th class="pa-3 text-right">Region:</th>
              <td class="pa-3">{{ project.region || 'N/A' }}</td>
            </tr>
            <tr>
              <th class="pa-3 text-right">LGU:</th>
              <td class="pa-3">{{ project.lgu || 'N/A' }}</td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Department:</th>
              <td class="pa-3">{{ project.department || 'N/A' }}</td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Implementing Office:</th>
              <td class="pa-3">{{ project.implementing_office || 'N/A' }}</td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Fund Source:</th>
              <td class="pa-3">
                {{ project.fund_source ? `$${project.fund_source.toLocaleString()}` : 'N/A' }}
              </td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Implementation Type:</th>
              <td class="pa-3">{{ project.implementation_type || 'N/A' }}</td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Contractor:</th>
              <td class="pa-3">{{ project.contractor || 'N/A' }}</td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Project Engineer:</th>
              <td class="pa-3">{{ project.project_engineer || 'N/A' }}</td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Year Implemented:</th>
              <td class="pa-3">
                {{
                  project.year_implemented ? `$${project.year_implemented.toLocaleString()}` : 'N/A'
                }}
              </td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Amount:</th>
              <td class="pa-3">
                {{ project.amount ? `$${project.amount.toLocaleString()}` : 'N/A' }}
              </td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Revised Amount:</th>
              <td class="pa-3">
                {{ project.revised_amount ? `$${project.revised_amount.toLocaleString()}` : 'N/A' }}
              </td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Location:</th>
              <td class="pa-3">{{ project.location || 'N/A' }}</td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Start Date:</th>
              <td class="pa-3">
                {{ project.start_date ? new Date(project.start_date).toLocaleDateString() : 'N/A' }}
              </td>
            </tr>
            <tr>
              <th class="pa-3 text-right">End Date:</th>
              <td class="pa-3">
                {{ project.end_date ? new Date(project.end_date).toLocaleDateString() : 'N/A' }}
              </td>
            </tr>

            <tr>
              <th class="pa-3 text-right">Created By:</th>
              <td class="pa-3">
                {{ project.creator?.name || 'N/A' }}
              </td>
            </tr>

            <!-- Documents -->
            <tr>
              <th class="pa-3 text-right">Documents:</th>
              <td class="pa-3">
                <div
                  v-if="project.document_urls && project.document_urls.length"
                  class="d-flex flex-wrap gap-4"
                >
                  <div
                    v-for="(doc, i) in project.document_urls"
                    :key="i"
                    class="d-flex align-center"
                  >
                    <v-icon color="red" icon="mdi-file-pdf-box" size="32" />
                    <a
                      :href="doc"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-blue text-decoration-none mr-2"
                    >
                      Document {{ i + 1 }},
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
    <RouterLink :to="viewPath">
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
