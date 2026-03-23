import { useState } from 'react';
import { Form, Button, Accordion } from 'react-bootstrap';
import store from 'store2';

export default function Configuration({ kcConfig, setKcConfig, loginOptions, setLginOptions }: any) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [kcConfigData, setKcConfigData] = useState(kcConfig);
  const [loginOptionsData, setLoginOptionsData] = useState(loginOptions);

  const handleClick = (event: any, { index }: any) => {
    if (index === activeIndex) setActiveIndex(null);
    else setActiveIndex(index);
  };

  const handleKcConfigChange = (event: any) => {
    const { name, value } = event.target;
    setKcConfigData({ ...kcConfigData, [name]: value });
  };

  const handleKcConfigSubmit = () => {
    store.session('kcConfig', kcConfigData);
    setKcConfig(kcConfigData);
  };

  const handleLoginOptionsChange = (event: any) => {
    const { name, value } = event.target;
    setLoginOptionsData({ ...loginOptionsData, [name]: value });
  };

  const handleAuthConfigSubmit = () => {
    store.session('loginOptions', loginOptionsData);
    setLginOptions(loginOptionsData);
  };

  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Keycloak OIDC Config</Accordion.Header>
        <Accordion.Body>
          <Form onSubmit={handleKcConfigSubmit}>
            <Form.Group onChange={handleKcConfigChange}>
              <Form.Label>Auth Server Url</Form.Label>
              <Form.Control
                placeholder="e.g https://dev.loginproxy.gov.bc.ca/auth"
                required
                type="url"
                name="url"
                defaultValue={kcConfigData?.url}
              />
            </Form.Group>
            <Form.Group onChange={handleKcConfigChange}>
              <Form.Label>Realm</Form.Label>
              <Form.Control placeholder="Realm" required name="realm" defaultValue={kcConfigData?.realm} />
            </Form.Group>
            <Form.Group onChange={handleKcConfigChange}>
              <Form.Label>Client Id</Form.Label>
              <Form.Control
                placeholder="Client ID (resource)"
                required
                name="clientId"
                defaultValue={kcConfigData?.clientId}
              />
            </Form.Group>
            <Button type="submit" style={{ marginTop: '1em' }} variant="secondary">
              Update
            </Button>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Keycloak Login Options</Accordion.Header>
        <Accordion.Body>
          <Form onSubmit={handleAuthConfigSubmit}>
            <Form.Group onChange={handleLoginOptionsChange}>
              <Form.Label>IDP Hint</Form.Label>
              <Form.Control placeholder="e.g idir" name="idpHint" defaultValue={loginOptionsData?.idpHint} />
            </Form.Group>
            <Form.Group onChange={handleLoginOptionsChange}>
              <Form.Label>Redirect URI</Form.Label>
              <Form.Control
                placeholder="http://localhost:3000/"
                required
                type="url"
                name="redirectUri"
                defaultValue={loginOptionsData?.redirectUri}
              />
            </Form.Group>
            <Form.Group onChange={handleLoginOptionsChange}>
              <Form.Label>Scope</Form.Label>
              <Form.Control
                placeholder="openid"
                required
                type="text"
                name="scope"
                defaultValue={loginOptionsData?.scope}
              />
            </Form.Group>
            <Form.Group onChange={handleLoginOptionsChange}>
              <Form.Label>Digital Credential Configuration ID</Form.Label>
              <Form.Control
                placeholder=""
                type="text"
                name="pres_req_conf_id"
                defaultValue={loginOptionsData?.pres_req_conf_id}
              />
            </Form.Group>
            {/* <Form.Group>
            <Form.Label>PKCE Method</Form.Label>
            <Form.Control
              placeholder="e.g idir"
              required
              onChange={handleLoginOptionsChange}
              name="PKCEMethod"
              defaultValue={loginOptionsData?.pkceMethod}
            />
          </Form.Group> */}
            <Button type="submit" style={{ marginTop: '1em' }} variant="secondary">
              Update
            </Button>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
