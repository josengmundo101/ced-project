<template>
  <div>
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const projectData = [8, 12, 3] // ongoing, completed, suspended
const total = projectData.reduce((a, b) => a + b, 0)

const chartData = {
  labels: ['Ongoing', 'Completed', 'Suspended'],
  datasets: [
    {
      data: projectData,
      backgroundColor: ['#42A5F5', '#66BB6A', '#EF5350'],
      borderColor: '#fff',
      borderWidth: 2,
    },
  ],
}

const chartOptions = {
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
            const percentage = ((value / total) * 100).toFixed(1)
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
          const percentage = ((value / total) * 100).toFixed(1)
          return `${context.label}: ${value} (${percentage}%)`
        },
      },
    },
  },
}
</script>

<style scoped>
div {
  height: 320px;
}
</style>
