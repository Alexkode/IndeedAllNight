import React from 'react';
import { Layout } from 'antd';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import FormContainer from './components/FormContainer';
import 'antd/dist/reset.css';

const { Header, Content } = Layout;

const theme = createTheme();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Header style={{ color: 'white', padding: '0 24px' }}>
          <h1 style={{ color: 'white', margin: 0, lineHeight: '64px' }}>
            Mon Formulaire JSONForms
          </h1>
        </Header>
        <Content style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
            <FormContainer />
          </div>
        </Content>
      </Layout>
    </ThemeProvider>
  );
};

export default App;