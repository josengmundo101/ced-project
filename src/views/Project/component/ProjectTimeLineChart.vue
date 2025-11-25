<script setup>
import { ref, watch, onMounted } from 'vue'
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
let chart

function buildDatasets() {
  const start = new Date(props.project.start_date)
  const expected = new Date(props.project.end_date)

  // FULL BASELINE (always shown)
  const baselineDataset = {
    label: 'Full Project Timeline',
    data: [
      { x: start, y: 1 },
      { x: expected, y: 1 },
    ],
    borderColor: 'rgba(150,150,150,0.4)',
    borderWidth: 12,
    pointRadius: 0,
  }

  let actualDataset

  if (props.project.status === 'completed') {
    const actual = props.project.actual_end_date
      ? new Date(props.project.actual_end_date)
      : expected

    actualDataset = {
      label: 'Completed',
      data: [
        { x: start, y: 1 },
        { x: actual, y: 1 },
      ],
      borderColor: 'green',
      borderWidth: 12,
      pointRadius: 0,
    }
  }

  if (props.project.status === 'ongoing') {
    actualDataset = {
      label: 'Ongoing',
      data: [
        { x: start, y: 1 },
        { x: new Date(), y: 1 },
      ],
      borderColor: 'blue',
      borderWidth: 12,
      pointRadius: 0,
    }
  }

  if (props.project.status === 'suspended') {
    actualDataset = {
      label: 'Suspended',
      data: [
        { x: start, y: 1 },
        { x: new Date(), y: 1 },
      ],
      borderColor: 'orange',
      borderWidth: 12,
      pointRadius: 0,
      borderDash: [10, 5],
    }
  }

  if (props.project.status === 'terminated') {
    actualDataset = {
      label: 'Terminated',
      data: [
        { x: start, y: 1 },
        { x: new Date(), y: 1 },
      ],
      borderColor: 'red',
      borderWidth: 12,
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
      indexAxis: 'y',
      scales: {
        x: {
          type: 'time',
          time: { unit: 'month' },
        },
        y: {
          display: false,
        },
      },
      responsive: true,
      plugins: {
        legend: { position: 'bottom' },
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
  <canvas ref="chartCanvas" height="120"></canvas>
</template>
