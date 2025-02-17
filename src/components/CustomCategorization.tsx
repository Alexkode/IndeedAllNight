import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import { materialCells } from '@jsonforms/material-renderers';
import { JsonSchema } from '@jsonforms/core';
import { ProLayout } from '@ant-design/pro-components';
import { Typography } from 'antd';

const { Title } = Typography;

interface ExtendedUISchemaElement {
  type: string;
  label?: string;
  elements?: ExtendedUISchemaElement[];
  scope?: string;
}

interface Form {
  name: string;
  schema: JsonSchema;
  uischema: {
    type: string;
    elements: ExtendedUISchemaElement[];
  };
  data: any;
}

interface FormSet {
  title: string;
  forms: Form[];
  schema: JsonSchema;
  data: any;
}

interface CustomCategorizationProps {
  formSets: FormSet[];
}

const CustomCategorization: React.FC<CustomCategorizationProps> = ({ formSets }) => {
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [selectedSet, setSelectedSet] = useState<FormSet>(formSets[0]);
  const [pathname, setPathname] = useState('/');

  const route = {
    path: '/',
    routes: formSets.map(set => ({
      path: `/${set.title.toLowerCase().replace(/\s+/g, '-')}`,
      name: set.title,
      routes: set.forms.map(form => ({
        path: `/${set.title.toLowerCase().replace(/\s+/g, '-')}/${form.name.toLowerCase().replace(/\s+/g, '-')}`,
        name: form.name,
      }))
    }))
  };

  const handleMenuClick = (path: string) => {
    setPathname(path);
    for (const set of formSets) {
      const setPath = `/${set.title.toLowerCase().replace(/\s+/g, '-')}`;
      if (path.startsWith(setPath)) {
        const form = set.forms.find(f => 
          path === `${setPath}/${f.name.toLowerCase().replace(/\s+/g, '-')}`
        );
        if (form) {
          setSelectedSet(set);
          setSelectedForm(form);
          break;
        }
      }
    }
  };

  return (
    <ProLayout
      title="Formulaire de Saisie"
      logo={null}
      layout="mix"
      splitMenus={false}
      contentWidth="Fluid"
      fixedHeader
      fixSiderbar
      route={route}
      location={{ pathname }}
      onMenuHeaderClick={() => setSelectedForm(null)}
      menuItemRender={(item, dom) => (
        <div onClick={() => handleMenuClick(item.path || '/')}>
          {dom}
        </div>
      )}
      style={{ height: '100vh' }}
    >
      <div style={{ padding: 24 }}>
        {selectedForm ? (
          <>
            <Title level={2}>{selectedSet.title}</Title>
            <Title level={3}>{selectedForm.name}</Title>
            <JsonForms
              schema={selectedSet.schema}
              uischema={selectedForm.uischema}
              data={selectedSet.data}
              renderers={materialRenderers}
              cells={materialCells}
            />
          </>
        ) : (
          <Title level={2}>Veuillez sélectionner un formulaire</Title>
        )}
      </div>
    </ProLayout>
  );
};

export default CustomCategorization;