import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import { materialCells } from '@jsonforms/material-renderers';
import { categorizationRenderers } from './renderers/categorization';

interface FormSet {
  title: string;
  schema: any;
  uischema: any;
  data: any;
  forms: Array<{
    name: string;
    schema: any;
    uischema: any;
    data: any;
  }>;
}

interface CustomCategorizationProps {
  formSets: FormSet[];
}

const CustomCategorization: React.FC<CustomCategorizationProps> = ({ formSets }) => {
  const allRenderers = [
    ...categorizationRenderers,
    ...materialRenderers
  ];

  // Création d'un schema global qui combine tous les schemas
  const globalSchema = {
    type: "object",
    properties: formSets.reduce((acc, set) => ({
      ...acc,
      ...set.schema.properties
    }), {})
  };

  // Création d'un data global qui combine toutes les données
  const globalData = formSets.reduce((acc, set) => ({
    ...acc,
    ...set.data
  }), {});

  // Création du uischema global avec la structure exacte des formulaires
  const globalUiSchema = {
    type: 'Categorization',
    elements: formSets.map(set => ({
      type: 'Category',
      label: set.title,
      elements: set.forms.map(form => ({
        ...form.uischema.elements[0], // On prend le premier élément tel quel
        label: form.name // On ajoute juste le label pour l'affichage
      }))
    }))
  };

  console.log('Global Schema:', globalSchema);
  console.log('Global UI Schema:', globalUiSchema);
  console.log('Global Data:', globalData);

  return (
    <JsonForms
      schema={globalSchema}
      uischema={globalUiSchema}
      data={globalData}
      renderers={allRenderers}
      cells={materialCells}
    />
  );
};

export default CustomCategorization;