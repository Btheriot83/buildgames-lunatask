import { expect, test } from '@playwright/test'

test('core loop: today → complete habit → add task → mood → export UI', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Tideglass' })).toBeVisible({ timeout: 20_000 })

  const skip = page.getByTestId('walk-skip')
  if (await skip.isVisible().catch(() => false)) {
    await skip.click()
  }

  const habit = page.getByTestId('today-habit-check').first()
  await expect(habit).toBeVisible()
  await habit.click()
  await expect(habit).toHaveAttribute('aria-pressed', 'true')

  await page.getByTestId('tab-tasks').click()
  const tasks = page.locator('#section-tasks')
  await expect(tasks.getByTestId('task-input')).toBeVisible()
  await tasks.getByTestId('task-input').fill('E2E capture task')
  await tasks.getByTestId('add-task').click()
  await expect(tasks.getByText('E2E capture task')).toBeVisible()
  await tasks.getByTestId('task-check').first().click()

  await page.getByTestId('tab-mood').click()
  const mood = page.locator('#section-mood')
  await expect(mood.getByTestId('mood-4')).toBeVisible()
  await mood.getByTestId('mood-4').click()
  await mood.getByTestId('mood-note').fill('Tide feels steady.')
  await mood.getByTestId('save-mood').click()
  await expect(mood.locator('.j-note', { hasText: 'Tide feels steady.' })).toBeVisible()

  await expect(page.getByTestId('export-btn')).toBeVisible()
})
