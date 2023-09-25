import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import useGetData from '@/hooks/useGetData'

export default function IntegrationsTable() {
    const { data: integrations, loadingData: loadingIntegrations, apiError, fetchData: fetchIntegrations } = useGetData([]);

    useEffect(() => {
        fetchIntegrations('/api/integrations')
    }, [])

    if (loadingIntegrations) {
        return (
            <p>Loading integration data...</p>
        )
    }

    if (apiError) {
        return (
            <>
                <p>Failed to fetch integrations. Click below to try again</p>
                <button onClick={() => fetchIntegrations('/api/integrations')}>Fetch Integrations</button>
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
