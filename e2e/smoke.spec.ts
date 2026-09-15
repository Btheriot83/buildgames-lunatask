import { expect, test } from '@playwright/test'

test('core loop: today → complete habit → add task → mood → export UI', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Tideglass' })).toBeVisible({ timeout: 20_000 })

  const habit = page.getByTestId('today-habit-check').first()
  await expect(habit).toBeVisible()
  await habit.click()
  await expect(habit).toHaveAttribute('aria-pressed', 'true')

  await page.getByTestId('tab-tasks').click()
  await page.getByTestId('task-input').fill('E2E capture task')
  await page.getByTestId('add-task').click()
  await expect(page.getByText('E2E capture task')).toBeVisible()
  await page.getByTestId('task-check').first().click()

  await page.getByTestId('tab-mood').click()
  await page.getByTestId('mood-4').click()
  await page.getByTestId('mood-note').fill('Tide feels steady.')
  await page.getByTestId('save-mood').click()
  await expect(page.locator('.j-note', { hasText: 'Tide feels steady.' })).toBeVisible()

  await expect(page.getByTestId('export-btn')).toBeVisible()
})
