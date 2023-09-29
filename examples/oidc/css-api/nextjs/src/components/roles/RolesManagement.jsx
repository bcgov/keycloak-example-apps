import useGetData from "@/hooks/useGetData"
import { useEffect, useRef, useState } from "react";

export default function RolesManagement({ selectedEnvironment, selectedIntegration }) {
    const { data: roles, loadingData: loadingRoles, apiError: fetchRolesError, fetchData: fetchRoles } = useGetData(null);
    const [newRoleName, setNewRoleName] = useState('');
    const [savingRole, setSavingRole] = useState(false);
    const [createRoleMessage, setCreateRoleMessage] = useState('');
    const roleFormRef = useRef(null);

    // Whenever the selected environment or integration change, need to reset the role form and refetch roles.
    useEffect(() => {
        setCreateRoleMessage('');
        setNewRoleName('')
        fetchRoles(`/api/integrations/${selectedIntegration.id}/${selectedEnvironment}/roles`)
    }, [selectedEnvironment, selectedIntegration])

    const handleRoleSubmit = async (e) => {
        e.preventDefault()
        const valid = roleFormRef.current.checkValidity()

        if (valid) {
            try {
                setSavingRole(true);
                setCreateRoleMessage('');
                const result = await fetch(`/api/integrations/${selectedIntegration.id}/${selectedEnvironment}/roles`, {
                    method: 'POST',
                    body: JSON.stringify({ name: newRoleName })
                })
                if (result.status >= 400) {
                    const resultJSON = await result.json()
                    setCreateRoleMessage(resultJSON.message || 'Unknown error creating role.')
                } else {
                    roles.data.push({
                        name: newRoleName,
                        composite: false,
                    })
                    setCreateRoleMessage(`Added role ${newRoleName}`)
                    setNewRoleName('')
                }
            } catch (e) {
                console.error(e)
                setCreateRoleMessage('Network error. Please try again.')
            } finally {
                setSavingRole(false)
            }
        }
    }

    const handleRoleNameChange = (e) => {
        setNewRoleName(e.target.value)
    }

    const noRolesFound = Array.isArray(roles?.data) && roles?.data.length === 0

    if (loadingRoles) {
        return (
            <>
                <p>Loading roles...</p>
            </>
        )
    }

    if (fetchRolesError) {
        return (
            <p>Error fetching role information (status code {fetchRolesError}).</p>
        )
    }

    return (
        <>
            <div>
                {noRolesFound ? (
                    <p>No roles exist for the selected integration and environment.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Role Name</th>
                                <th>Role is Composite</th>
                                <th>Add to user</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles && roles.data.map(role => (
                                <tr key={role.name}>
                                    <td>{role.name}</td>
                                    <td>{String(role.composite)}</td>
                                    <td>input</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <form onSubmit={handleRoleSubmit} ref={roleFormRef}>
                <label htmlFor="role-input">
                    Create a New Role: &nbsp;
                </label>
                <input id="role-input" required value={newRoleName} onChange={handleRoleNameChange}></input>
                <button disabled={savingRole}>Submit</button>
                {createRoleMessage && (
                    <p><em>{createRoleMessage}</em></p>
                )}
            </form>
        </>
    )
}