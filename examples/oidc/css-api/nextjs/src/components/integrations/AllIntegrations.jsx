import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import useGetData from '@/hooks/useGetData'
import IntegrationsTable from './IntegrationsTable'

export default function AllIntegrations() {
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
            {integrations.data?.length ? (
                <>
                    <p><em>This component demonstrates using your CSS API account to fetch all integrations owned by your team.</em></p>
                    <IntegrationsTable integrations={integrations.data} />
                </>
            ) : (
                <p>No integrations found. Add an integration to your team's account to test out this example app.</p>
            )}
        </>
    )
}
