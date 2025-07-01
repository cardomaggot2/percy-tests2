import 'dotenv/config';
import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';
import routes from '../routes-grouped.json';

type RouteGroups = {
  [section: string]: string[];
};

const BASE_URL = 'https://www.infinitiusa.com';
const routeGroups: RouteGroups = routes;

for (const [section, paths] of Object.entries(routeGroups)) {
  test.describe(`${section} pages`, () => {
    for (const route of paths) {
      test(`Snapshot of ${route}`, async ({ page }) => {
        await page.goto(`${BASE_URL}${route}`);
        await page.waitForTimeout(10000); // Waits 5 seconds for assets to load
        // ✅ Clean the route to use as a unique snapshot name
        const cleanRoute = route.replace(/\//g, '-').replace(/^-/, '');
        if(cleanRoute.includes('/shopping-tools/build-price')) {
          await percySnapshot(page, `${section} - ${cleanRoute}`);
        }
      });
    }
  });
}

