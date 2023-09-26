import '../styles/globals.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import type { AppProps } from 'next/app';
import Keycloak from 'keycloak-js';
import type { KeycloakConfig, KeycloakInitOptions, KeycloakLoginOptions } from 'keycloak-js';
import store from 'store2';
import getConfig from 'next/config';

const { publicRuntimeConfig = {} } = getConfig() || {};
const { sso_redirect_uri, app_env } = publicRuntimeConfig;

function MyApp({ Component, pageProps }: AppProps) {
  const [keycloak, setKeycloak] = useState<Keycloak>();
  const [loading, setLoading] = useState(false);

  const [kcConfig, setKcConfig] = useState<KeycloakConfig>(
    store.session('kcConfig') || {
      url: 'https://dev.loginproxy.gov.bc.ca/auth',
      realm: 'standard',
      clientId: 'test-client',
    },
  );

  const initOptions: KeycloakInitOptions = {
    pkceMethod: 'S256',
    onLoad: app_env === 'prod' ? 'check-sso' : undefined,
    silentCheckSsoRedirectUri: app_env === 'prod' ? `${sso_redirect_uri}/silent-check-sso.html` : undefined,
  };

  const [loginOptions, setLginOptions] = useState<KeycloakLoginOptions>(
    store.session('loginOptions') || {
      redirectUri: sso_redirect_uri,
      idpHint: '',
      scope: 'openid',
      pres_req_conf_id: ''
    },
  );

  useEffect(() => {
    setLoading(true);

    const initKeycloak = async () => {
      const _keycloak = new (Keycloak as any)(kcConfig);

      _keycloak.onTokenExpired = () => {
        _keycloak.updateToken();
      };

      setLoading(true);
      _keycloak
        .init(initOptions)
        .then(() => {
          setKeycloak(_keycloak);
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
