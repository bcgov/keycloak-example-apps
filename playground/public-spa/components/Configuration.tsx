import { useState } from 'react';
import { Form, Button, Accordion, Icon } from 'semantic-ui-react';
import store from 'store2';

export default function Configuration({ kcConfig, setKcConfig, loginOptions, setLginOptions }: any) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [kcConfigData, setKcConfigData] = useState(kcConfig);
  const [loginOptionsData, setLoginOptionsData] = useState(loginOptions);

  const handleClick = (event: any, { index }: any) => {
    if (index === activeIndex) setActiveIndex(null);
    else setActiveIndex(index);
  };

  const handleKcConfigChange = (event: any, { name, value }: any) => {
    setKcConfigData({ ...kcConfigData, [name]: value });
  };

  const handleKcConfigSubmit = () => {
    store.session('kcConfig', kcConfigData);
    setKcConfig(kcConfigData);
  };

  const handleLoginOptionsChange = (event: any, { name, value }: any) => {
    setLoginOptionsData({ ...loginOptionsData, [name]: value });
  };

  const handleAuthConfigSubmit = () => {
    store.session('loginOptions', loginOptionsData);
    setLginOptions(loginOptionsData);
  };

  return (
    <Accordion styled>
      <Accordion.Title active={activeIndex === 0} index={0} onClick={handleClick}>
        <Icon name="dropdown" />
        Keycloak OIDC Config
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
        <Form onSubmit={handleKcConfigSubmit}>
          <Form.Field>
            <label>Auth Server Url</label>
            <Form.Input
              placeholder="e.g https://dev.loginproxy.gov.bc.ca/auth"
              required
              type="url"
              onChange={handleKcConfigChange}
              name="url"
              defaultValue={kcConfigData?.url}
            />
          </Form.Field>
          <Form.Field>
            <label>Realm</label>
            <Form.Input
              placeholder="Realm"
              required
              onChange={handleKcConfigChange}
              name="realm"
              defaultValue={kcConfigData?.realm}
            />
          </Form.Field>
          <Form.Field>
            <label>Client Id</label>
            <Form.Input
              placeholder="Client ID (resource)"
              required
              onChange={handleKcConfigChange}
              name="clientId"
              defaultValue={kcConfigData?.clientId}
            />
          </Form.Field>
          <Button type="submit">Update</Button>
        </Form>
      </Accordion.Content>
      <Accordion.Title active={activeIndex === 1} index={1} onClick={handleClick}>
        <Icon name="dropdown" />
        Keycloak Login Options
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 1}>
        <Form onSubmit={handleAuthConfigSubmit}>
          <Form.Field>
            <label>IDP Hint</label>
            <Form.Input
              placeholder="e.g idir"
              onChange={handleLoginOptionsChange}
              name="idpHint"
              defaultValue={loginOptionsData?.idpHint}
            />
          </Form.Field>
          <Form.Field>
            <label>Redirect URI</label>
            <Form.Input
              placeholder="http://localhost:3000/"
              required
              type="url"
              onChange={handleLoginOptionsChange}
              name="redirectUri"
              defaultValue={loginOptionsData?.redirectUri}
            />
          </Form.Field>
          <Form.Field>
            <label>Scope</label>
            <Form.Input
              placeholder="openid"
              required
              type="text"
              onChange={handleLoginOptionsChange}
              name="scope"
              defaultValue={loginOptionsData?.scope}
            />
          </Form.Field>
          <Form.Field>
            <label>Verifiable Credential Configuration ID</label>
            <Form.Input
              placeholder=""
              type="text"
              onChange={handleLoginOptionsChange}
              name="pres_req_conf_id"
              defaultValue={loginOptionsData?.pres_req_conf_id}
            />
          </Form.Field>
          {/* <Form.Field>
            <label>PKCE Method</label>
            <Form.Input
              placeholder="e.g idir"
              required
              onChange={handleLoginOptionsChange}
              name="PKCEMethod"
              defaultValue={loginOptionsData?.pkceMethod}
            />
          </Form.Field> */}
          <Button type="submit">Update</Button>
        </Form>
      </Accordion.Content>
    </Accordion>
  );
}
