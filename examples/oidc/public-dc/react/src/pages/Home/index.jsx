import { useContext } from 'react';
import { AuthenticationContext } from '../../App.jsx';
import moment from 'moment';

function Home() {
  const keycloak = useContext(AuthenticationContext);

  const formatDate = (unixTime) => {
    return moment(unixTime * 1000).format('dddd, MMMM Do, YYYY h:mm A');
  };

  return (
    <>
      {keycloak.authenticated && (
        <>
          <p>{`Id token expires at ` + formatDate(keycloak.idTokenParsed.exp)}</p>
          <p>{`Access token expires at ` + formatDate(keycloak.tokenParsed.exp)}</p>
          <p>{`Refresh token expires at ` + formatDate(keycloak.refreshTokenParsed.exp)}</p>
          <button onClick={() => keycloak.logout()}>logout</button>
        </>
      )}
    </>
  );
}

export default Home;