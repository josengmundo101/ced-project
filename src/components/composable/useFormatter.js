// src/components/composable/useFormatters.js
export function useFormatters() {
  const formatCurrency = (value) => {
    if (value == null || value === '') return 'N/A'

    const num = Number(value)
    if (isNaN(num)) return 'N/A'

    return (
      '₱' +
      num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    )
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
