import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/')

    // Check page title
    await expect(page).toHaveTitle(/GenHQ/)

    // Check main heading is visible
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
  })

  test('should display navigation', async ({ page }) => {
    await page.goto('/')

    // Check for navigation links
    await expect(page.getByRole('link', { name: /features/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /login/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /get started/i })).toBeVisible()
  })

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
  })
})

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/')

    // Check for h1
    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toBeVisible()

    // Check that there's only one h1
    const h1Count = await page.getByRole('heading', { level: 1 }).count()
    expect(h1Count).toBe(1)
  })
})
