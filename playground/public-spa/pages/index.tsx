import { useEffect, useState } from 'react';
import type { KeycloakInstance, KeycloakConfig, KeycloakLoginOptions } from 'keycloak-js';
import { Container, Button, Message } from 'semantic-ui-react';
import TokenDetails from 'components/TokenDetails';
import Configuration from 'components/Configuration';

interface Props {
  keycloak: KeycloakInstance;
  kcConfig: KeycloakConfig;
  setKcConfig: Function;
  loginOptions: KeycloakLoginOptions;
  setLginOptions: Function;
}

const Home = ({ keycloak, kcConfig, setKcConfig, loginOptions, setLginOptions }: Props) => {
  const handleLogin = () => keycloak?.login(loginOptions);
  const handleLogout = () => keycloak?.logout();

  return (
    <Container>
      <br />
      <h1>Keycloak OIDC Playground</h1>
      <p>
        This is a playground application for using the <code>keycloak-js</code> adapter. Click the{' '}
        <strong>Login</strong> button below to login with the default client (uses IDIR as an IDP) and see your
        different token details. If you have your own public client, you can use the form below (Click on{' '}
        <strong>Set My Own Client</strong>) to authenticate to your own client.
      </p>
      <Button onClick={handleLogin}>Login</Button>
      {keycloak?.authenticated && <Button onClick={handleLogout}>Logout</Button>}
      <br />
      <br />
      <Configuration
        kcConfig={kcConfig}
        setKcConfig={setKcConfig}
        loginOptions={loginOptions}
        setLginOptions={setLginOptions}
      />
      <br />
      {keycloak?.authenticated ? (
        <TokenDetails keycloak={keycloak} />
      ) : (
        <Message>
          <p>Login to see id token details</p>
        </Message>
      )}
    </Container>
  );
};

export default Home;
