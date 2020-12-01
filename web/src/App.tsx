import React from 'react';

import Routes from './routes';

import AppProvider from './hooks';
import GlobalStyles from './styles/global';

const App: React.FC = () => (
  <>
    <AppProvider>
      <Routes />
    </AppProvider>

    <GlobalStyles />
  </>
);

export default App;
