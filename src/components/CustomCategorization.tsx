import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import { materialCells } from '@jsonforms/material-renderers';
import { JsonSchema } from '@jsonforms/core';
import { Layout, Menu } from 'antd';

const { Content, Sider } = Layout;

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

  const menuItems = formSets.map(set => ({
    key: set.title,
    label: set.title,
    children: set.forms.map(form => ({
      key: `${set.title}-${form.name}`,
      label: form.name,
    }))
  }));

  const handleMenuClick = ({ key }: { key: string }) => {
    for (const set of formSets) {
      if (key.startsWith(set.title)) {
        const formKey = key.replace(`${set.title}-`, '');
        const form = set.forms.find(f => f.name === formKey);
        if (form) {
          setSelectedSet(set);
          setSelectedForm(form);
          break;
        }
      }
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" width={250}>
        <Menu
          mode="inline"
          style={{ height: '100%', borderRight: 0 }}
          items={menuItems}
          onClick={handleMenuClick}
          defaultOpenKeys={formSets.map(set => set.title)}
        />
      </Sider>
      <Layout style={{ padding: '24px' }}>
        <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
          {selectedForm && (
            <JsonForms
              schema={selectedSet.schema}
              uischema={selectedForm.uischema}
              data={selectedSet.data}
              renderers={materialRenderers}
              cells={materialCells}
            />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default CustomCategorization;