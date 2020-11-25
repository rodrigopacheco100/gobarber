import React from 'react';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import { AuthProvider } from './contexts/AuthContext';

import GlobalStyles from './styles/global';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <GlobalStyles />
  </>
);

export default App;
