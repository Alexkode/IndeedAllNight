import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import { materialCells } from '@jsonforms/material-renderers';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { JsonSchema, UISchemaElement } from '@jsonforms/core';

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-error': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#bdbdbd',
            },
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          '&.Mui-error': {
            color: '#757575',
          },
        },
      },
    },
  },
});

interface FormContainerProps {
  schema: JsonSchema;
  uischema: UISchemaElement;
  data: any;
}

const FormContainer: React.FC<FormContainerProps> = ({ schema, uischema, data: initialData }) => {
  const [data, setData] = useState(initialData);

  const handleChange = ({ data, errors }: any) => {
    setData(data);
    console.log('Form data changed:', data);
    console.log('Validation errors:', errors);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{ padding: '20px' }}>
          <JsonForms
            schema={schema}
            uischema={uischema}
            data={data}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={handleChange}
          />
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default FormContainer;