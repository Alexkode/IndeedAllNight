import { JsonFormsRendererRegistryEntry } from '@jsonforms/core';
import CategorizationRenderer from './CategorizationRenderer';
import { categorizationTester } from './tester';

export const categorizationRenderers: JsonFormsRendererRegistryEntry[] = [
  {
    renderer: CategorizationRenderer,
    tester: categorizationTester
  }
];