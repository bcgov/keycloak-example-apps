import type { KeycloakConfig, KeycloakLoginOptions } from 'keycloak-js';
import TokenDetails from 'components/TokenDetails';
import Configuration from 'components/Configuration';
import Keycloak from 'keycloak-js';
import { Button, Card, Container, Row } from 'react-bootstrap';

interface Props {
  keycloak: Keycloak;
  kcConfig: KeycloakConfig;
  setKcConfig: Function;
  loginOptions: KeycloakLoginOptions;
  setLginOptions: Function;
}

const Home = ({ keycloak, kcConfig, setKcConfig, loginOptions, setLginOptions }: Props) => {
  const handleLogin = async () => {
    // @ts-ignore
    if (loginOptions.pres_req_conf_id) {
      var loginURL = await keycloak?.createLoginUrl(loginOptions);
      if (loginURL) {
        // @ts-ignore
        window.location.href = loginURL + '&pres_req_conf_id=' + loginOptions.pres_req_conf_id;
      }
    } else {
      keycloak?.login(loginOptions);
    }
  };
  const handleLogout = () => {
    const userIdp = keycloak?.tokenParsed?.preferred_username.split('@')[1];
    if (userIdp && ['idir', 'bceidbasic', 'bceidbusiness', 'bceidboth'].some((idp) => userIdp === idp)) {
      const kcPostLogoutRedirectUri =
        loginOptions.redirectUri +
        `${keycloak.idToken ? '&id_token_hint=' + keycloak.idToken : `&client_id=${kcConfig?.clientId}`}`;
      const url = new URL('https://logon7.gov.bc.ca/clp-cgi/logoff.cgi');
      url.searchParams.append('retnow', '1');
      url.searchParams.append(
        'returl',
        `${kcConfig?.url}/realms/${kcConfig?.realm}/protocol/openid-connect/logout?post_logout_redirect_uri=${kcPostLogoutRedirectUri}`,
      );

      window.location.href = url.href;
    } else keycloak?.logout();
  };
  return (
    <Container>
      <Row>
        <h2 style={{ fontWeight: 'bold' }}>Keycloak OIDC Playground</h2>
        <p>
          This is a playground application for using the <code>keycloak-js</code> adapter. Click the{' '}
          <strong>Login</strong> button below to login with the default client (uses IDIR as an IDP) and see your
          different token details. If you have your own public client, you can use the form below (Click on{' '}
          <strong>Set My Own Client</strong>) to authenticate to your own client.
        </p>
      </Row>
      <Row>
        <div style={{ display: 'flex', gap: '1em', marginBottom: '1em' }}>
          <Button onClick={handleLogin} variant="secondary">
            Login
          </Button>
          {keycloak?.authenticated && (
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </Row>
      <Row>
        <Configuration
          kcConfig={kcConfig}
          setKcConfig={setKcConfig}
          loginOptions={loginOptions}
          setLginOptions={setLginOptions}
        />
      </Row>
      <Row>
        <div style={{ margin: '2em auto' }}>
          {keycloak?.authenticated ? (
            <TokenDetails keycloak={keycloak} />
          ) : (
            <Card>
              <Card.Body>Login to see id token details</Card.Body>
            </Card>
          )}
        </div>
      </Row>
    </Container>
  );
};

export default Home;
