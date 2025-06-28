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
        //await page.waitForLoadState('networkidle');
        await percySnapshot(page, `${section} - ${route}`);
      });
    }
  });
}

