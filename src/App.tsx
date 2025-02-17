import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CustomCategorization from './components/CustomCategorization';

// Import des sets de formulaires
import set1Schema from './data/sets/set1/schema.json';
import set1UiSchema from './data/sets/set1/uischema.json';
import set1Data from './data/sets/set1/data.json';
import set2Schema from './data/sets/set2/schema.json';
import set2UiSchema from './data/sets/set2/uischema.json';
import set2Data from './data/sets/set2/data.json';

const theme = createTheme();

// Création d'un schema global qui combine les deux schemas
const globalSchema = {
  type: "object",
  properties: {
    ...set1Schema.properties,
    ...set2Schema.properties
  }
};

// Création d'un data global qui combine les deux data
const globalData = {
  ...set1Data,
  ...set2Data
};

const formSets = [
  {
    title: "Informations Personnelles",
    schema: globalSchema,
    uischema: set1UiSchema,
    data: globalData,
    forms: [
      {
        name: "Informations Personnelles",
        schema: globalSchema,
        uischema: {
          ...set1UiSchema,
          elements: [set1UiSchema.elements[0]]
        },
        data: globalData
      },
      {
        name: "Adresse",
        schema: globalSchema,
        uischema: {
          ...set1UiSchema,
          elements: [set1UiSchema.elements[1]]
        },
        data: globalData
      },
      {
        name: "Informations Professionnelles",
        schema: globalSchema,
        uischema: {
          ...set1UiSchema,
          elements: [set1UiSchema.elements[2]]
        },
        data: globalData
      }
    ]
  },
  {
    title: "Informations Projet",
    schema: globalSchema,
    uischema: set2UiSchema,
    data: globalData,
    forms: [
      {
        name: "Projet",
        schema: globalSchema,
        uischema: {
          ...set2UiSchema,
          elements: [set2UiSchema.elements[0]]
        },
        data: globalData
      },
      {
        name: "Équipe",
        schema: globalSchema,
        uischema: {
          ...set2UiSchema,
          elements: [set2UiSchema.elements[1]]
        },
        data: globalData
      }
    ]
  }
];

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomCategorization formSets={formSets} />
    </ThemeProvider>
  );
};

export default App;