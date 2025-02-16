import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import { materialCells } from '@jsonforms/material-renderers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import schema from '../data/schema.json';
import uischema from '../data/uischema.json';
import initialData from '../data/data.json';

const FormContainer: React.FC = () => {
  const [data, setData] = useState(initialData);

  const handleChange = ({ data, errors }: any) => {
    setData(data);
    console.log('Form data changed:', data);
    console.log('Validation errors:', errors);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={handleChange}
      />
    </LocalizationProvider>
  );
};

export default FormContainer;