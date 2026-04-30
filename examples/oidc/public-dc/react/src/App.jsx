import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/index.jsx';
import { useState, useEffect, useCallback, createContext } from 'react';
import { initializeKeycloak } from './services/keycloak';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home keycloak />,
  },
]);

export const AuthenticationContext = createContext('authentication');

function App() {
  const [keycloak, setKeycloak] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const initKeycloak = useCallback(async () => {
    const _keycloak = await initializeKeycloak();
    setIsAuthenticated(_keycloak.authenticated);
    setKeycloak(_keycloak);
  }, []);

  useEffect(() => {
    initKeycloak();
  }, [initKeycloak]);

  return (
    <>
      {isAuthenticated && (
        <AuthenticationContext.Provider value={keycloak}>
          <RouterProvider router={router} />
        </AuthenticationContext.Provider>
      )}
    </>
  );
}

export default App;