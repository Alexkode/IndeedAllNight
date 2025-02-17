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

const formSets = [
  {
    title: "Informations Personnelles",
    schema: set1Schema,
    data: set1Data,
    forms: [
      {
        name: "Informations Personnelles",
        schema: set1Schema,
        uischema: {
          ...set1UiSchema,
          elements: [set1UiSchema.elements[0]]
        },
        data: set1Data
      },
      {
        name: "Adresse",
        schema: set1Schema,
        uischema: {
          ...set1UiSchema,
          elements: [set1UiSchema.elements[1]]
        },
        data: set1Data
      },
      {
        name: "Informations Professionnelles",
        schema: set1Schema,
        uischema: {
          ...set1UiSchema,
          elements: [set1UiSchema.elements[2]]
        },
        data: set1Data
      }
    ]
  },
  {
    title: "Informations Projet",
    schema: set2Schema,
    data: set2Data,
    forms: [
      {
        name: "Projet",
        schema: set2Schema,
        uischema: {
          ...set2UiSchema,
          elements: [set2UiSchema.elements[0]]
        },
        data: set2Data
      },
      {
        name: "Équipe",
        schema: set2Schema,
        uischema: {
          ...set2UiSchema,
          elements: [set2UiSchema.elements[1]]
        },
        data: set2Data
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