import { useContext } from 'react';
import { AuthenticationContext } from '../../App';
import { logoutOptions } from '../../services/keycloak';

function Home() {
  const keycloak = useContext(AuthenticationContext);
  return (
    <>
      {keycloak.authenticated && (
        <button
          onClick={() => {
            keycloak?.logout(logoutOptions);
          }}
        >
          logout
        </button>
      )}
    </>
  );
}

export default Home;
