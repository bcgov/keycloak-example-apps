import '../styles/globals.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import type { AppProps } from 'next/app';
import Keycloak from 'keycloak-js';
import type { KeycloakInstance, KeycloakConfig, KeycloakInitOptions, KeycloakLoginOptions } from 'keycloak-js';
import store from 'store2';

const initOptions: KeycloakInitOptions = {
  pkceMethod: 'S256',
  checkLoginIframe: false,
  onLoad: undefined,
};

function MyApp({ Component, pageProps }: AppProps) {
  const [keycloak, setKeycloak] = useState<KeycloakInstance>();
  const [loading, setLoading] = useState(false);

  const [kcConfig, setKcConfig] = useState<KeycloakConfig>(
    store.session('kcConfig') || {
      url: 'https://dev.loginproxy.gov.bc.ca/auth',
      realm: 'standard',
      clientId: 'test-client',
    },
  );

  const [loginOptions, setLginOptions] = useState<KeycloakLoginOptions>(
    store.session('loginOptions') || {
      redirectUri: `https://logon7.gov.bc.ca/clp-cgi/logoff.cgi?retnow=1&returl=${encodeURIComponent(
        'https://bcgov.github.io/keycloak-example-apps',
      )}`,
      idpHint: '',
      scope: 'openid',
    },
  );

  useEffect(() => {
    setLoading(true);

    const initKeycloak = async () => {
      const _keycloak = new (Keycloak as any)(kcConfig);
      setKeycloak(_keycloak);

      _keycloak.onTokenExpired = () => {
        _keycloak.updateToken();
      };

      setLoading(true);
      _keycloak
        .init(initOptions)
        .then(() => {
          setLoading(false);
        })
        .catch((error: any) => {
          console.log('Error in init: ', error);
          toast.error(
            () => (
              <>
                <h4>{error?.error}</h4>
                <div>${error?.error_description}</div>
              </>
            ),
            {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: 0,
              theme: 'colored',
            },
          );
          setLoading(false);
        });
    };
    initKeycloak();
  }, [kcConfig]);

  return (
    <>
      <ToastContainer />
      <Component
        {...pageProps}
        keycloak={keycloak}
        kcConfig={kcConfig}
        setKcConfig={setKcConfig}
        loginOptions={loginOptions}
        setLginOptions={setLginOptions}
      />
    </>
  );
}

export default MyApp;
