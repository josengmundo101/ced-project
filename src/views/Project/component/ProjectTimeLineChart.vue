<script setup>
import { ref, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import 'chartjs-adapter-date-fns'

Chart.register(...registerables)

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const chartCanvas = ref(null)
let chart = null

function buildDatasets() {
  const start = new Date(props.project.start_date)
  const expected = new Date(props.project.end_date)

  // ✅ FULL BASELINE (same as before)
  const baselineDataset = {
    label: 'Full Project Timeline',
    data: [
      { x: start, y: 0 },
      { x: expected, y: 0 },
    ],
    borderColor: 'rgba(200,200,200,0.7)',
    borderWidth: 14,
    borderCapStyle: 'round',
    pointRadius: 0,
  }

  let actualDataset

  // ✅ SAME LOGIC — ONLY COLORS/STYLING CHANGED

  if (props.project.status === 'completed') {
    const actual = props.project.actual_end_date
      ? new Date(props.project.actual_end_date)
      : expected

    actualDataset = {
      label: 'Completed',
      data: [
        { x: start, y: 0 },
        { x: actual, y: 0 },
      ],
      borderColor: '#2e7d32',
      borderWidth: 14,
      borderCapStyle: 'round',
      pointRadius: 0,
    }
  }

  if (props.project.status === 'ongoing') {
    actualDataset = {
      label: 'Ongoing',
      data: [
        { x: start, y: 0 },
        { x: new Date(), y: 0 },
      ],
      borderColor: '#1565c0',
      borderWidth: 14,
      borderCapStyle: 'round',
      pointRadius: 0,
    }
  }

  if (props.project.status === 'suspended') {
    actualDataset = {
      label: 'Suspended',
      data: [
        { x: start, y: 0 },
        { x: new Date(), y: 0 },
      ],
      borderColor: '#ef6c00',
      borderWidth: 14,
      borderCapStyle: 'round',
      borderDash: [8, 6], // 👈 visual hint without logic change
      pointRadius: 0,
    }
  }

  if (props.project.status === 'terminated') {
    actualDataset = {
      label: 'Terminated',
      data: [
        { x: start, y: 0 },
        { x: new Date(), y: 0 },
      ],
      borderColor: '#c62828',
      borderWidth: 14,
      borderCapStyle: 'round',
      pointRadius: 0,
    }
  }

  return [baselineDataset, actualDataset]
}

function renderChart() {
  if (chart) chart.destroy()

  chart = new Chart(chartCanvas.value, {
    type: 'line',
    data: {
      datasets: buildDatasets(),
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',

      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'month',
          },
          grid: {
            color: 'rgba(0,0,0,0.06)',
          },
        },
        y: {
          display: false,
          min: -1,
          max: 1,
        },
      },

      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            boxWidth: 12,
          },
        },
      },

      elements: {
        line: {
          tension: 0,
        },
      },
    },
  })
}

onMounted(renderChart)

watch(
  () => props.project,
  () => renderChart(),
  { deep: true },
)
</script>

<template>
  <div style="height: 140px">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>
