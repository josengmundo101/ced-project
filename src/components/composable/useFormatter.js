// src/components/composable/useFormatters.js
export function useFormatters() {
  const formatCurrency = (value) => {
    if (value == null || value === '') return 'N/A'
    return value.toLocaleString('en-PH', {
      style: 'currency',
      currency: 'PHP',
    })
  }

  const formatYear = (value) => {
    if (!value) return 'N/A'
    return `${value}`
  }

  const formatNumber = (value) => {
    if (value == null || value === '') return 'N/A'
    return value.toLocaleString()
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return {
    formatCurrency,
    formatYear,
    formatNumber,
    formatDate,
  }
}
