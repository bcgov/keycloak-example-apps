import useGetData from '@/hooks/useGetData'
import { useEffect, useState } from 'react';
import RolesManagement from '@/components/roles/RolesManagement';
import UserAssignment from '@/components/roles/UserAssignment';
import styles from '@/styles/Roles.module.css'

export default function Roles() {
    const { data: integrations, loadingData: loadingIntegrations, apiError, fetchData: fetchIntegrations } = useGetData([]);
    const [selectedIntegration, setSelectedIntegration] = useState(null);
    const [selectedEnvironment, setSelectedEnvironment] = useState(null);

    useEffect(() => {
        fetchIntegrations('/api/integrations')
    }, [])

    const handleIntegrationSelect = (e) => {
        setSelectedEnvironment(null)
        setSelectedIntegration(JSON.parse(e.target.value))
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
                <p>Failed to load integration details (api failed with status code {apiError}).</p>
            </>
        )
    }

    if (!integrations?.data?.length) {
        return (
            <>
                <h2>Roles</h2>
                <p>No integrations found for your team/s account. Add an integration to your team to test out this app.</p>
            </>
        )
    }

    const displayRoleManagement = selectedEnvironment && selectedIntegration

    return (
        <>
            <h2>Roles</h2>
            <p>Please select an integration and environment below for your role management.</p>
            {integrations.data?.length && (
                <div>
                    <label htmlFor='integration-select'>Select Integration: &nbsp;</label>
                    <select id='integration-select' onChange={handleIntegrationSelect} defaultValue={'default'}>
                        <option disabled value='default'>Please select</option>
                        {integrations.data.map(integration => (
                            <option key={integration.id} value={JSON.stringify(integration)}>{integration.projectName}</option>
                        ))}
                    </select>

                    {/* Only show environment select when an integration is already selected. */}
                    {selectedIntegration && (
                        <fieldset>
                            <legend>Select Environment:</legend>

                            {selectedIntegration?.environments.includes('dev') && (
                                <div>
                                    <input type="radio" id="development-radio-btn" name="enviroment" value="dev" checked={selectedEnvironment === 'dev'} onChange={handleEnvironmentChange} />
                                    <label htmlFor="development-radio-btn">Dev</label>
                                </div>
                            )}

                            {selectedIntegration?.environments.includes('test') && (
                                <div>
                                    <input type="radio" id="test-radio-btn" name="enviroment" value="test" checked={selectedEnvironment === 'test'} onChange={handleEnvironmentChange} />
                                    <label htmlFor="test-radio-btn">Test</label>
                                </div>
                            )}

                            {selectedIntegration?.environments.includes('prod') && (
                                <div>
                                    <input type="radio" id="prod-radio-btn" name="enviroment" value="prod" checked={selectedEnvironment === 'prod'} onChange={handleEnvironmentChange} />
                                    <label htmlFor="prod-radio-btn">Prod</label>
                                </div>
                            )}
                        </fieldset>
                    )}
                </div>
            )}
            {displayRoleManagement && (
                <>
                    <h2>Role Management</h2>
                    <div className={styles.container}>
                        <RolesManagement
                            selectedEnvironment={selectedEnvironment}
                            selectedIntegration={selectedIntegration}
                        />
                        <UserAssignment
                            selectedEnvironment={selectedEnvironment}
                        />
                    </div>
                </>
            )}
        </>
    )
}
