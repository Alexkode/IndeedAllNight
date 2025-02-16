import React, { useState } from 'react';
import { Layout } from 'antd';
import { ProLayout } from '@ant-design/pro-components';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import { materialCells } from '@jsonforms/material-renderers';

const { Content } = Layout;

interface FormSet {
  title: string;
  forms: {
    name: string;
    schema: any;
    uischema: any;
    data: any;
  }[];
}

interface CustomCategorizationProps {
  formSets: FormSet[];
}

const CustomCategorization: React.FC<CustomCategorizationProps> = ({ formSets }) => {
  const [selectedForm, setSelectedForm] = useState<{
    schema: any;
    uischema: any;
    data: any;
  } | null>(null);

  const menuItems = formSets.map((set, setIndex) => ({
    path: `/set-${setIndex}`,
    name: set.title,
    children: set.forms.map((form, formIndex) => ({
      path: `/form-${setIndex}-${formIndex}`,
      name: form.name,
      component: 'form',
      onSelect: () => {
        setSelectedForm(form);
      }
    })),
  }));

  return (
    <ProLayout
      layout="mix"
      splitMenus={false}
      route={{
        path: '/',
        routes: menuItems
      }}
      menuItemRender={(item, dom) => (
        <div onClick={() => item.onSelect?.()}>
          {dom}
        </div>
      )}
      title="Mon Application"
      style={{ minHeight: '100vh' }}
    >
      <Content style={{ padding: '24px', minHeight: 280 }}>
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
    </ProLayout>
  );
};

export default CustomCategorization;