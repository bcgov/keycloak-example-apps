import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DefaultNavigation from "@button-inc/bcgov-theme/Navigation";
import { SessionRefresher, SessionTimeoutHandler } from "@bcgov-cas/sso-react";
import Modal from "components/LogoutWarningModal";
import Container from 'react-bootstrap/Container';

const Navigation = () => {
  return (
    <DefaultNavigation
      header="main"
      title="Demo Time!"
    >
      <ul>
        <li>
          <a href="/protected">Protected Route</a>
        </li>
      </ul>
    </DefaultNavigation>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Navigation />
    <Container>
      <Component {...pageProps} />
      <SessionRefresher throttledTime={1000} refreshEvents={["keydown"]} />
      <SessionTimeoutHandler
        modalDisplaySecondsBeforeLogout={1790}
        renderModal={(props) => <Modal {...props} />}
      />
    </Container>
    </>
  );
}

export default MyApp;
