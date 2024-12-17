import { useContext, useState } from 'react';
import { AuthenticationContext } from '../../App';
import { logout } from '../../services/keycloak';
import moment from 'moment';

const fetchRestictedContent = (token, setMessage) => {
    setMessage('Request in flight...')
    fetch(`${import.meta.env.VITE_SERVER_URI}/restricted`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.text())
        .then(message => setMessage(message))
        .catch(() => setMessage('Fetch failed. Ensure the rest API is running on the expected host and port.'))
}

function Home() {
    const keycloak = useContext(AuthenticationContext);
    const [message, setMessage] = useState(null);

    const formatDate = (unixTime) => {
        return moment(unixTime * 1000).format('dddd, MMMM Do, YYYY h:mm A');
    };

    return (
        <>
            {keycloak.authenticated && (
                <>
                    <div>
                        <h2>Token Details</h2>
                        <p>{`Id token expires at ` + formatDate(keycloak.idTokenParsed.exp)}</p>
                        <p>{`Access token expires at ` + formatDate(keycloak.tokenParsed.exp)}</p>
                        <p>{`Refresh token expires at ` + formatDate(keycloak.refreshTokenParsed.exp)}</p>
                        <button onClick={() => logout()}>logout</button>
                    </div>

                    <div>
                        <h2>Test Rest API</h2>
                        <p>In order to test sending a token to a backing rest api, you need to also run one of the rest API examples</p>
                        <button onClick={() => fetchRestictedContent(keycloak.token, setMessage)}>Fetch Restricted Content</button>
                    </div>

                    {message && (
                        <>
                            <p>{message}</p>
                        </>
                    )}
                </>
            )}
        </>
    );
}

export default Home;
