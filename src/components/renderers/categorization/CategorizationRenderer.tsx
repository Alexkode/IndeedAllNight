import React, { useState } from 'react';
import {
  UISchemaElement,
  isCategorization,
  LayoutProps,
} from '@jsonforms/core';
import { withJsonFormsLayoutProps } from '@jsonforms/react';
import { ProLayout } from '@ant-design/pro-components';
import { Typography } from 'antd';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import { materialCells } from '@jsonforms/material-renderers';

const { Title } = Typography;

interface ExtendedUISchemaElement extends UISchemaElement {
  label?: string;
  elements?: ExtendedUISchemaElement[];
  scope?: string;
  type: string;
}

interface Category extends ExtendedUISchemaElement {
  type: 'Category';
  label: string;
  elements: ExtendedUISchemaElement[];
}

const CategorizationRenderer: React.FC<LayoutProps> = ({ 
  schema,
  uischema, 
  data,
  enabled,
  visible,
  path,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedElement, setSelectedElement] = useState<ExtendedUISchemaElement | null>(null);
  const [pathname, setPathname] = useState('/');

  if (!visible || !enabled || !isCategorization(uischema)) {
    return null;
  }

  const categories = uischema.elements as Category[];

  const route = {
    path: '/',
    routes: categories.map(category => ({
      path: `/${category.label.toLowerCase().replace(/\s+/g, '-')}`,
      name: category.label,
      routes: category.elements.map(element => ({
        path: `/${category.label.toLowerCase().replace(/\s+/g, '-')}/${(element.label || '').toLowerCase().replace(/\s+/g, '-')}`,
        name: element.label || 'Form',
        element: element
      }))
    }))
  };

  const handleMenuClick = (path: string) => {
    setPathname(path);
    
    for (const category of route.routes) {
      if (path === category.path) {
        const foundCategory = categories.find(c => c.label === category.name);
        if (foundCategory) {
          setSelectedCategory(foundCategory);
          setSelectedElement(null);
        }
        return;
      }
      
      const subRoute = category.routes?.find(r => r.path === path);
      if (subRoute) {
        const foundCategory = categories.find(c => c.label === category.name);
        if (foundCategory) {
          setSelectedCategory(foundCategory);
          const formElement = foundCategory.elements.find(e => e.label === subRoute.name);
          if (formElement) {
            console.log('Form Element:', formElement);
            setSelectedElement({
              type: 'VerticalLayout',
              elements: formElement.elements || []
            });
          }
        }
        return;
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
      onMenuHeaderClick={() => {
        setSelectedCategory(null);
        setSelectedElement(null);
      }}
      menuItemRender={(item: any, dom) => (
        <div onClick={() => handleMenuClick(item.path || '/')}>
          {dom}
        </div>
      )}
      style={{ height: '100vh' }}
    >
      <div style={{ padding: 24 }}>
        {selectedElement ? (
          <>
            <Title level={2}>{selectedCategory?.label}</Title>
            <Title level={3}>{selectedElement.label}</Title>
            <JsonForms
              schema={schema}
              uischema={selectedElement}
              data={data}
              renderers={materialRenderers}
              cells={materialCells}
            />
          </>
        ) : selectedCategory ? (
          <>
            <Title level={2}>{selectedCategory.label}</Title>
            <Title level={3}>Veuillez sélectionner un sous-formulaire</Title>
          </>
        ) : (
          <Title level={2}>Veuillez sélectionner un formulaire</Title>
        )}
      </div>
    </ProLayout>
  );
};

export default withJsonFormsLayoutProps(CategorizationRenderer);