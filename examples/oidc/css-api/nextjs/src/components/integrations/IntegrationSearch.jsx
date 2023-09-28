import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import useGetData from '@/hooks/useGetData'
import IntegrationsTable from './IntegrationsTable';


export default function IntegrationSearch() {
    const [integrationID, setIntegrationID] = useState('');
    const { data: integration, loadingData: loadingIntegration, apiError, fetchData: fetchIntegration } = useGetData(null);
    
    const handleChange = (e) => {
        setIntegrationID(e.target.value)
    }
    
    const handleSearch = () => {
        fetchIntegration(`/api/integrations/${integrationID}`)
    }

    return (
        <div>
            <p><em>This component demonstrates using your CSS API integration to fetch a single integration by its ID. You can use an ID from the table above to test it out.</em></p>
            <label htmlFor="integration-search">Integration ID:</label>
            <input type="text" id="integration-search" value={integrationID} onChange={handleChange} />
            <button onClick={handleSearch}>Search</button>
            {integration?.id && (
                <>
                    <p>{integration.id}</p>
                    <IntegrationsTable integrations={[integration]} />
                </>

            )}
            {integration?.message && (
                <p>{integration.message}</p>
            )}
            {apiError && (
                <p>API Error try again :( </p>
            )}
            {loadingIntegration && (
                <p>Loading...</p>
            )}
        </div>
    )
}
