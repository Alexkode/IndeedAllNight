import { rankWith, uiTypeIs, RankedTester } from '@jsonforms/core';

export const categorizationTester: RankedTester = rankWith(
  2,
  uiTypeIs('Categorization')
);