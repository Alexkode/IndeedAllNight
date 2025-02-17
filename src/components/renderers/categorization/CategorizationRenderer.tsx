import React from 'react';
import {
  JsonSchema,
  UISchemaElement,
  isCategorization,
  LayoutProps
} from '@jsonforms/core';
import { withJsonFormsLayoutProps } from '@jsonforms/react';
import { Layout, Menu } from 'antd';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import { materialCells } from '@jsonforms/material-renderers';

const { Content, Sider } = Layout;

interface ExtendedUISchemaElement extends UISchemaElement {
  label?: string;
  elements?: ExtendedUISchemaElement[];
}

interface MenuItem {
  key: string;
  label: string;
  element?: ExtendedUISchemaElement;
  children?: MenuItem[];
}

const CategorizationRenderer: React.FC<LayoutProps> = ({ 
  uischema, 
  schema, 
  path, 
  renderers, 
  cells,
  data 
}) => {
  const [selectedForm, setSelectedForm] = React.useState<{
    schema: JsonSchema;
    uischema: ExtendedUISchemaElement;
    data: any;
  } | null>(null);

  if (!isCategorization(uischema)) {
    return null;
  }

  const categories: MenuItem[] = (uischema.elements as ExtendedUISchemaElement[]).map((category) => ({
    key: category.label || '',
    label: category.label || '',
    children: (category.elements || []).map((element: ExtendedUISchemaElement, index: number) => ({
      key: `${category.label}-${index}`,
      label: element.label || `Element ${index + 1}`,
      element: element
    }))
  }));

  const handleMenuClick = ({ key }: { key: string }) => {
    for (const category of categories) {
      const form = category.children?.find(child => child.key === key);
      if (form?.element) {
        setSelectedForm({
          schema: schema,
          uischema: form.element,
          data: data
        });
        break;
      }
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" width={250}>
        <Menu
          mode="inline"
          style={{ height: '100%', borderRight: 0 }}
          items={categories}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout style={{ padding: '24px' }}>
        <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
          {selectedForm && (
            <JsonForms
              schema={selectedForm.schema}
              uischema={selectedForm.uischema}
              data={selectedForm.data}
              renderers={materialRenderers}
              cells={materialCells}
            />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default withJsonFormsLayoutProps(CategorizationRenderer);