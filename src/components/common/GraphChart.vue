<template>
  <div>
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { computed } from 'vue'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

// Props: parent will pass stats + loading
const props = defineProps({
  stats: {
    type: Object,
    default: () => ({ ongoing: 0, completed: 0, terminated: 0, suspended: 0 }),
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

// Chart Data
const chartData = computed(() => {
  const values = [
    props.stats.ongoing,
    props.stats.completed,
    props.stats.terminated,
    props.stats.suspended,
  ]
  const total = values.reduce((a, b) => a + b, 0)

  return {
    labels: ['Ongoing', 'Completed', 'Terminated', 'Suspended'],
    datasets: [
      {
        data: values,
        backgroundColor: ['#42A5F5', '#66BB6A', '#EF5350', '#FFA726'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
    total,
  }
})

// Chart Options
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        generateLabels: (chart) => {
          const data = chart.data.datasets[0].data
          const labels = chart.data.labels
          const total = data.reduce((a, b) => a + b, 0)

          return labels.map((label, i) => {
            const value = data[i]
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0
            return {
              text: `${label}: ${percentage}% (${value})`,
              fillStyle: chart.data.datasets[0].backgroundColor[i],
            }
          })
        },
      },
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const value = context.raw
          const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0)
          const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0
          return `${context.label}: ${value} (${percentage}%)`
        },
      },
    },
  },
}))
</script>

<style scoped>
div {
  height: 320px;
}
</style>
