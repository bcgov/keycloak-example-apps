import { Container } from 'semantic-ui-react';
import { Table, Button } from 'semantic-ui-react';
import isObject from 'lodash/isObject';

const getValue = (val) => {
  return isObject(val) ? JSON.stringify(val) : String(val);
};

const ObjectTable = ({ obj }) => {
  const fields = Object.keys(obj);

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Key</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {fields.map((field) => {
          return (
            <Table.Row key={field}>
              <Table.Cell>{field}</Table.Cell>
              <Table.Cell style={{ overflowWrap: 'anywhere' }}>{getValue(obj[field])}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default function Home({ authorization, tokens, user }) {
  const userFields = Object.keys(user);

  if (userFields.length === 0) {
    return (
      <Container>
        <Button primary onClick={() => (window.location = '/oauth/login')}>
          Login 405
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <h3>Authorization</h3>
      <ObjectTable obj={authorization} />

      <h3>Tokens</h3>
      <ObjectTable obj={tokens} />

      <h3>User Info</h3>
      <ObjectTable obj={user} />

      <Button primary onClick={() => (window.location = '/oauth/logout')}>
        Logout
      </Button>
    </Container>
  );
}

export async function getServerSideProps({ req, res, query: params }) {
  return {
    props: {
      authorization: req.session?.authorization || {},
      tokens: req.session?.tokens || {},
      user: req.session?.user || {},
    },
  };
}
