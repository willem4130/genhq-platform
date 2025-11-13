import { describe, it, expect } from 'vitest'

describe('Example Unit Test', () => {
  it('should pass a basic test', () => {
    expect(1 + 1).toBe(2)
  })

  it('should handle string operations', () => {
    const result = 'Hello'.toLowerCase()
    expect(result).toBe('hello')
  })
})

// Example testing utilities
describe('Utility Functions', () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  it('should format currency correctly', () => {
    expect(formatCurrency(1000)).toBe('$1,000.00')
    expect(formatCurrency(0)).toBe('$0.00')
    expect(formatCurrency(99.99)).toBe('$99.99')
  })
})
