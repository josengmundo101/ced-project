<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProjects } from '@/components/composable/useProject'
import TableLoader from '@/components/UI/TableLoader.vue'
import { useAuth } from '@/components/composable/useAuth'
import { useFormatters } from '@/components/composable/useFormatter'
import ProjectTimeLineChart from './ProjectTimeLineChart.vue'

const route = useRoute()
const { getProject, loading, error } = useProjects()
const { currentUser } = useAuth()
const { formatCurrency, formatYear, formatDate } = useFormatters()
const project = ref(null)
const showDocModal = ref(false)
const selectedDoc = ref(null)
const isAdmin = computed(() => currentUser.value?.role_id === 1)

// Document preview state
const openDocument = (url) => {
  selectedDoc.value = url
  showDocModal.value = true

  // Wait a tick to ensure the modal has rendered, then focus the iframe (optional)
  setTimeout(() => {
    const iframe = document.querySelector('#doc-frame')
    if (iframe) iframe.focus()
  }, 200)
}

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
        <v-table class="custom-table striped-table" density="comfortable">
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
              <td class="pa-3 text-left">{{ project.project_name }}</td>
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
                        : project.status === 'terminated'
                          ? 'red'
                          : 'orange'
                  "
                  text-color="white"
                  size="small"
                >
                  {{ project.status }}
                </v-chip>
              </td>
            </tr>

            <tr>
              <th class="pa-3 text-right align-top">Remarks:</th>
              <td class="pa-3 text-left">
                <div v-if="project.remarks">{{ project.remarks }}</div>
                <span v-else class="text-grey">No Remarks</span>
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
                {{ project.fund_source ? `${project.fund_source.toLocaleString()}` : 'N/A' }}
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
                {{ formatYear(project.year_implemented) }}
              </td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Amount:</th>
              <td class="pa-3">{{ formatCurrency(project.amount) }}</td>
            </tr>
            <tr>
              <th class="pa-3 text-right">Revised Amount:</th>
              <td class="pa-3">{{ formatCurrency(project.revised_amount) }}</td>
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

            <!-- Documents (Visible only to Admin) -->
            <tr v-if="isAdmin">
              <th class="pa-3 text-right align-top">Documents:</th>
              <td class="pa-3">
                <div v-if="project.document_urls?.length">
                  <div
                    v-for="(doc, i) in project.document_urls"
                    :key="i"
                    class="d-flex align-center mb-2"
                  >
                    <v-icon color="red" icon="mdi-file-pdf-box" size="28" class="mr-2" />
                    <v-btn size="small" color="primary" variant="text" @click="openDocument(doc)">
                      View Document {{ i + 1 }}
                    </v-btn>
                  </div>
                </div>
                <span v-else class="text-grey">No Documents</span>

                <!-- Document Preview Modal -->
                <v-dialog v-model="showDocModal" max-width="900px" persistent>
                  <v-card rounded="lg">
                    <v-card-title class="d-flex justify-space-between align-center">
                      <span class="font-weight-medium">📄 Document Preview</span>
                      <v-btn icon="mdi-close" variant="text" @click="showDocModal = false" />
                    </v-card-title>

                    <v-card-text class="pa-0">
                      <iframe
                        id="doc-frame"
                        v-if="selectedDoc"
                        :src="selectedDoc"
                        width="100%"
                        height="700px"
                        frameborder="0"
                        style="border: none"
                      ></iframe>

                      <div v-else class="text-center text-grey pa-6">No document selected.</div>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-card>

    <ProjectTimeLineChart v-if="project" :project="project" class="mt-10" />

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
  /* Slightly darker, more prominent background for attribute labels */
  background-color: #f5f5f5;
  color: #151515;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  /* Increased font weight for the labels/headers */
  font-weight: 700;
  white-space: nowrap;
  /* Adjust padding for a more spacious, formal look */
  padding: 10px 15px !important;
  vertical-align: middle; /* Ensure text aligns nicely */
  width: 30%; /* Give labels a defined width */
}

.custom-table td {
  font-size: 0.95rem; /* Slightly larger text */
  vertical-align: middle;
  padding: 10px 15px !important; /* Match padding in <th> */
  border-bottom: 1px solid rgba(0, 0, 0, 0.05); /* Lighter border for data rows */
}

/* Zebra Striping for formal, professional look */
.striped-table tbody tr:nth-child(odd) {
  background-color: #ffffff; /* White background for odd rows */
}
.striped-table tbody tr:nth-child(even) {
  /* Very light grey for a subtle stripe effect on even rows */
  background-color: #fafafa;
}

/* Ensure the last row has no bottom border if the table is borderless */
.custom-table tbody tr:last-child td,
.custom-table tbody tr:last-child th {
  border-bottom: none;
}
</style>
