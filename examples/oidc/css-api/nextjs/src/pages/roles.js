import useGetData from '@/hooks/useGetData'
import { useEffect, useState } from 'react';

export default function Roles() {
    const { data: integrations, loadingData: loadingIntegrations, apiError, fetchData: fetchIntegrations } = useGetData([]);
    const [selectedIntegration, setSelectedIntegration] = useState(null);
    const [selectedEnvironment, setSelectedEnvironment] = useState(null);

    useEffect(() => {
        fetchIntegrations('/api/integrations')
    }, [])

    const handleIntegrationSelect = (e) => {
        const thingy = JSON.parse(e.target.value)
        setSelectedIntegration(thingy)
    }

    const handleEnvironmentChange = (e) => {
        setSelectedEnvironment(e.target.value)
    }

    if (loadingIntegrations) {
        return (
            <>
                <h2>Roles</h2>
                <p>Loading itegration details...</p>
            </>

        )
    }

    if (apiError) {
        return (
            <>
                <h2>Roles</h2>
                <p>Failed to load integration details. Please refresh.</p>
            </>
        )
    }

    return (
        <>
            <h2>Roles</h2>
            <p>Please select an integration and environment below for your role management.</p>
            {integrations.data?.length && (
                <div>
                    <label htmlFor='integration-select'>Select Integration</label>
                    <select id='integration-select' onChange={handleIntegrationSelect}>
                        <option disabled selected>Please select</option>
                        {integrations.data.map(integration => (
                            <option key={integration.id} value={JSON.stringify(integration)}>{integration.projectName}</option>
                        ))}
                    </select>

                    {selectedIntegration && (
                        <fieldset>
                            <legend>Select Environment:</legend>

                            {selectedIntegration?.environments.includes('dev') && (
                                <div>
                                    <input type="radio" id="development-radio-btn" name="enviroment" value="dev" checked={selectedEnvironment === 'dev'}  onChange={handleEnvironmentChange}/>
                                    <label htmlFor="development-radio-btn">Dev</label>
                                </div>
                            )}

                            {selectedIntegration?.environments.includes('test') && (
                                <div>
                                    <input type="radio" id="test-radio-btn" name="enviroment" value="test" checked={selectedEnvironment === 'test'}  onChange={handleEnvironmentChange}/>
                                    <label htmlFor="test-radio-btn">Test</label>
                                </div>
                            )}

                            {selectedIntegration?.environments.includes('prod') && (
                                <div>
                                    <input type="radio" id="prod-radio-btn" name="enviroment" value="prod" checked={selectedEnvironment === 'prod'}  onChange={handleEnvironmentChange}/>
                                    <label htmlFor="prod-radio-btn">Prod</label>
                                </div>
                            )}
                        </fieldset>
                    )}
                </div>
            )}
        </>
    )
}
