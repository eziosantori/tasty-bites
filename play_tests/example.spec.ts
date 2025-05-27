import { test, expect } from '@playwright/test';

test('homepage has Tasty Bites title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Tasty Bites/i);
});

test('can search for recipes', async ({ page }) => {
  await page.goto('/');
  // Assuming there is a search input with placeholder
  const searchInput = page.getByPlaceholder(/search for recipes/i);
  await searchInput.fill('pasta');
  await searchInput.press('Enter');
  // Wait for results to appear (adjust selector as needed)
  await expect(page.getByRole('listitem').first()).toBeVisible();
});

test('can add a recipe to favorites and see badge update', async ({ page }) => {
  await page.goto('/');

  // Wait for the featured recipes list to load (role="listitem" for each card)
  await expect(page.getByRole('listitem').first()).toBeVisible();

  // Click the favorite button on the first featured recipe card
  const firstCard = page.getByRole('listitem').first();
  const favBtn = await firstCard.getByRole('button', { name: /favorite/i });
  await favBtn.click();

  // Check that the favorites badge in the navigation shows 1 using role="status"
  const badge = page.getByRole('status');
  await expect(badge).toHaveText('1');
});

test('search by ingredient tomato, open first listitem, the recipe should have tomato', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Search by ingredient' }).click();
  await page.getByRole('textbox', { name: 'Search for recipes' }).click();
  await page.getByRole('textbox', { name: 'Search for recipes' }).fill('tomato');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  // Get the first button that starts with "Open details"
  const openDetailsBtn = await page.getByRole('button', { name: /^Open details/i }).first();
  await openDetailsBtn.click();
  // Find the ingredients section by region role and accessible name
  const ingredientsSection = await page.getByRole('region', { name: /ingredients/i });
  // Get all descendants containing "tomato"
  const tomatoElements = await ingredientsSection.locator('*', { hasText: /tomato/i }).all();
  // Count how many there are
  expect(tomatoElements.length).toBeGreaterThan(0);
});
