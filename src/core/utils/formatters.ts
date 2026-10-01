export function formatCurrency(amount: number): string {
  return `S/ ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

export function truncate(s: string, max: number): string {
  if (s.length <= max) return s
  return s.slice(0, max) + '…'
}
