import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'


export default function IntegrationsTable() {
    const [integrations, setIntegrations] = useState([]);
    const [loadingIntegrations, setLoadingIntegrations] = useState(false);
    const [apiError, setApiError] = useState(false);

    const fetchIntegrations = async () => {
        try {
            setLoadingIntegrations(true);
            const fetchedIntegrations = await fetch('/api/integrations')
                .then(res => {
                    console.log(res.status)
                    if (res.status >= 300) throw 'Request failure'
                    return res.json()
                })
            setIntegrations(fetchedIntegrations.data)
        } catch {
            setApiError(true)
        } finally {
            setLoadingIntegrations(false)
        }
    }

    useEffect(() => fetchIntegrations, [])

    if (loadingIntegrations) {
        return (
            <p>Loading integration data...</p>
        )
    }

    if (apiError) {
        return (
            <>
                <p>Failed to fetch integrations. Click below to try again</p>
                <button onClick={fetchIntegrations}>Fetch Integrations</button>
            </>
        )
    }

    return (
        <>
            {integrations.length ? (
                <>
                    <h2>Integrations</h2>
                    <table className={styles.bordered}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Created</th>
                                <th>Environments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {integrations.map(integration => (
                                <tr key={integration.id}>
                                    <td>{integration.projectName}</td>
                                    <td>{integration.status}</td>
                                    <td>{integration.createdAt}</td>
                                    <td>
                                        <ul>
                                            {integration.environments.map(env => (
                                                <li key={env}>{env}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
                </>

            ) : (
                <p>No integrations found</p>
            )}
        </>
    )
}
