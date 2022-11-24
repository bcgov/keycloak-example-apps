import type { KeycloakInstance, KeycloakConfig, KeycloakLoginOptions } from 'keycloak-js';
import { useState } from 'react';
import styled from 'styled-components';
import { Table, Menu, Segment, Button, Icon } from 'semantic-ui-react';
import { isPlainObject } from 'lodash';

type ActiveItem =
  | 'payload'
  | 'idToken'
  | 'idTokenParsed'
  | 'token'
  | 'tokenParsed'
  | 'refreshToken'
  | 'refreshTokenParsed';

interface Props {
  keycloak: KeycloakInstance;
  activeItem: ActiveItem;
  customValue?: string;
  style: any;
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

const Contents = ({ keycloak, activeItem, customValue }: Props) => {
  if (customValue)
    return (
      <Segment className="overflow-wrap">
        <Copy onClick={() => copyTextToClipboard(customValue)}>
          <Button icon>
            <Icon name="copy outline" />
          </Button>
        </Copy>
        {customValue}
      </Segment>
    );

  const value = (keycloak as KeycloakInstance & { payload?: string })[activeItem];

  if (typeof value === 'string')
    return (
      <Segment className="overflow-wrap">
        <Copy onClick={() => copyTextToClipboard(value)}>
          <Button icon>
            <Icon name="copy outline" />
          </Button>
        </Copy>
        {value}
      </Segment>
    );
  if (typeof value === 'object')
    return (
      <>
        <Table celled>
          <Table.Body>
            {Object.entries(value).map(([key, val]: any) => (
              <Table.Row key={key}>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{isPlainObject(val) ? JSON.stringify(val) : val}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    );
  return null;
};

interface TokenDetailsProps {
  keycloak: KeycloakInstance;
}

export default function TokenDetails({ keycloak }: TokenDetailsProps) {
  const [activeItem, setActiveItem] = useState<ActiveItem>('payload');
  const handleItemClick = (event: any, { name }: any) => setActiveItem(name);

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
          <Menu attached="top" tabular>
            <Menu.Item name="payload" active={activeItem === 'payload'} onClick={handleItemClick}>
              Payload
            </Menu.Item>
            <Menu.Item name="token" active={activeItem === 'token'} onClick={handleItemClick}>
              Token Raw{' '}
            </Menu.Item>
            <Menu.Item name="tokenParsed" active={activeItem === 'tokenParsed'} onClick={handleItemClick} />
            <Menu.Item name="idToken" active={activeItem === 'idToken'} onClick={handleItemClick}>
              ID Token Raw{' '}
            </Menu.Item>
            <Menu.Item name="idTokenParsed" active={activeItem === 'idTokenParsed'} onClick={handleItemClick} />
            <Menu.Item name="refreshToken" active={activeItem === 'refreshToken'} onClick={handleItemClick}>
              Refresh Token Raw{' '}
            </Menu.Item>
            <Menu.Item
              name="refreshTokenParsed"
              active={activeItem === 'refreshTokenParsed'}
              onClick={handleItemClick}
            />
          </Menu>
          <Contents
            keycloak={keycloak}
            activeItem={activeItem}
            customValue={customValue}
            style={{ maxWidth: '100%' }}
          />
        </>
      )}
    </>
  );
}
