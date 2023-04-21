import { useContext } from 'react';
import { AuthenticationContext } from '../../App';
import { logout } from '../../services/keycloak';

function Home() {
  const keycloak = useContext(AuthenticationContext);
  return <>{keycloak.authenticated && <button onClick={logout}>logout</button>}</>;
}

export default Home;
