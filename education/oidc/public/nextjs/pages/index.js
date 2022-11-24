import { Container, Button, Message } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [auth, setAuth] = useState({ keycloak: {} });
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const initKeycloak = async () => {
      let Keycloak = require('keycloak-js');
      const keycloak = Keycloak('/keycloak.json');
      if (window && typeof window !== 'object') return;
      keycloak
        .init({ pkceMethod: 'S256', redirectUri: 'http://localhost:3000', idpHint: 'idir' })
        .then((authenticated) => {
          setAuth({ keycloak: keycloak, authenticated: authenticated });
        });
    };
    initKeycloak();
  }, []);

  const handleLogin = () => auth.keycloak.login({ idpHint: 'idir' });
  const handleLogout = () => auth.keycloak.logout();

  const getSecret = async () => {
    try {
      const headers = auth.keycloak.token ? { Authorization: `Bearer ${auth.keycloak.token}` } : {};
      const response = await axios.get('http://localhost:3000/api/secret', { headers });
      setAnswer(`The password is: ${response.data.message}`);
    } catch (err) {
      setAnswer('Failed to fetch resources');
    }
  };

  return (
    <Container>
      <h1>A simple Keycloak Configuration</h1>
      <Button onClick={handleLogin}>Login</Button>
      <Button onClick={handleLogout}>Logout</Button>
      <Button onClick={getSecret}>Get Protected Resources</Button>
      <Message>
        <Message.Header>
          Click on the button <em>Get Protected Resources</em> to fetch from the API
        </Message.Header>{' '}
        {answer && <p>{answer}</p>}
      </Message>
    </Container>
  );
}
