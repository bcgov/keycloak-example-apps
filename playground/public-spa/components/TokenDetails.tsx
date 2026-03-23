import Keycloak from 'keycloak-js';
import { useState } from 'react';
import styled from 'styled-components';
import { isPlainObject, over } from 'lodash';
import { Button, Tab, Table, Tabs } from 'react-bootstrap';
import { MdOutlineCopyright } from 'react-icons/md';

type ActiveItem =
  | 'payload'
  | 'idToken'
  | 'idTokenParsed'
  | 'token'
  | 'tokenParsed'
  | 'refreshToken'
  | 'refreshTokenParsed';

interface Props {
  keycloak: Keycloak;
  activeItem: ActiveItem;
  customValue?: string;
  style?: any;
}

const Copy = styled.div`
  position: absolute;
  border: 1
  top: 0;
  right: 0;
`;

const copyTextToClipboard = (text: string) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  } catch (err) {
    document.body.removeChild(textArea);
    return false;
  }
};

const CopyButton = ({ text }: { text: string }) => {
  return (
    <Button variant="secondary" onClick={() => copyTextToClipboard(text)} style={{ marginBottom: '1em' }}>
      Copy
    </Button>
  );
};

const Contents = ({ keycloak, activeItem, customValue, style }: Props) => {
  if (customValue)
    return (
      <>
        <CopyButton text={customValue} />
        <div style={style}>{customValue}</div>
      </>
    );

  const value = (keycloak as Keycloak & { payload?: string })[activeItem];

  if (typeof value === 'string')
    return (
      <>
        <CopyButton text={value} />
        <div style={style}>{value}</div>
      </>
    );
  if (typeof value === 'object')
    return (
      <>
        <Table striped bordered hover>
          <tbody>
            {Object.entries(value).map(([key, val]: any) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{isPlainObject(val) ? JSON.stringify(val) : String(val)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  return null;
};

interface TokenDetailsProps {
  keycloak: Keycloak;
}

const TabContent = styled.div`
  overflow-wrap: break-word;
  max-width: 100%;
`;

export default function TokenDetails({ keycloak }: TokenDetailsProps) {
  const [activeItem, setActiveItem] = useState<ActiveItem>('payload');

  let customValue = '';
  if (activeItem === 'payload') {
    const original = {
      access_token: keycloak.token,
      refresh_token: keycloak.refreshToken,
      id_token: keycloak.idToken,
    };

    customValue = JSON.stringify(original);
  }

  return (
    <>
      {keycloak?.authenticated && (
        <>
          <Tabs activeKey={activeItem} onSelect={(k) => setActiveItem(k as ActiveItem)} className="mb-3">
            <Tab eventKey="payload" title="Payload">
              <Contents
                keycloak={keycloak}
                activeItem={activeItem}
                customValue={customValue}
                style={{ overflowWrap: 'break-word', maxWidth: '100%' }}
              />
            </Tab>
            <Tab eventKey="token" title="Token">
              <Contents
                keycloak={keycloak}
                activeItem={activeItem}
                customValue={customValue}
                style={{ overflowWrap: 'break-word', maxWidth: '100%' }}
              />
            </Tab>
            <Tab eventKey="tokenParsed" title="Token Parsed">
              <Contents
                keycloak={keycloak}
                activeItem={activeItem}
                customValue={customValue}
                style={{ overflowWrap: 'break-word', maxWidth: '100%' }}
              />
            </Tab>
            <Tab eventKey="idToken" title="ID Token">
              <Contents
                keycloak={keycloak}
                activeItem={activeItem}
                customValue={customValue}
                style={{ overflowWrap: 'break-word', maxWidth: '100%' }}
              />
            </Tab>
            <Tab eventKey="idTokenParsed" title="ID Token Parsed">
              <Contents
                keycloak={keycloak}
                activeItem={activeItem}
                customValue={customValue}
                style={{ overflowWrap: 'break-word', maxWidth: '100%' }}
              />
            </Tab>
            <Tab eventKey="refreshToken" title="Refresh Token">
              <Contents
                keycloak={keycloak}
                activeItem={activeItem}
                customValue={customValue}
                style={{ overflowWrap: 'break-word', maxWidth: '100%' }}
              />
            </Tab>
            <Tab eventKey="refreshTokenParsed" title="Refresh Token Parsed">
              <Contents
                keycloak={keycloak}
                activeItem={activeItem}
                customValue={customValue}
                style={{ overflowWrap: 'break-word', maxWidth: '100%' }}
              />
            </Tab>
          </Tabs>
        </>
      )}
    </>
  );
}
