import { useContext, useEffect, useCallback } from 'react';
import { AuthenticationContext } from '../../App';
import { logout } from '../../services/keycloak';
import * as moment from 'moment';

function Home() {
  const keycloak = useContext(AuthenticationContext);

  const formatDate = (unixTime) => {
    return moment(unixTime * 1000).format('dddd, MMMM Do, YYYY h:mm A');
  };

  const checkUserSession = useCallback(async () => {
    try {
      const data = await keycloak.loadUserInfo();
      console.log(`user session exists`, data);
    } catch (err) {
      window.location.reload();
    }
  }, [keycloak]);

  useEffect(() => {
    const interval = setInterval(checkUserSession, 5_000);
    return () => clearInterval(interval);
  });

  return (
    <>
      {keycloak.authenticated && (
        <>
          <p>{`Id token expires at ` + formatDate(keycloak.idTokenParsed.exp)}</p>
          <p>{`Access token expires at ` + formatDate(keycloak.tokenParsed.exp)}</p>
          <p>{`Refresh token expires at ` + formatDate(keycloak.refreshTokenParsed.exp)}</p>
          <button onClick={() => logout()}>logout</button>
        </>
      )}
    </>
  );
}

export default Home;
