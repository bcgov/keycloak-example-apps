import useGetData from "@/hooks/useGetData"
import { useEffect, useRef, useState } from "react";

export default function RolesManagement({ selectedEnvironment, selectedIntegration }) {
    const { data: roles, loadingData: loadingRoles, apiError: fetchRolesError, fetchData: fetchRoles, setData: setRoles } = useGetData(null);
    const [newRoleName, setNewRoleName] = useState('');
    const [savingRole, setSavingRole] = useState(false);
    const [createRoleMessage, setCreateRoleMessage] = useState('');
    const roleFormRef = useRef(null);
    const [assigningRole, setAssigningRole] = useState(false);
    const [deletingRole, setDeletingRole] = useState(false);

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
                    const newRoles = {...roles}
                    newRoles.data.push({
                        name: newRoleName,
                        composite: false,
                    })
                    setRoles(newRoles)
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

    const handleUserSubmit = async (event, roleName) => {
        event.preventDefault()
        setAssigningRole(true);
        const formData = Object.fromEntries(new FormData(event.target))
        const userId = formData?.userId
        try {
            const result = await fetch(`/api/integrations/${selectedIntegration.id}/${selectedEnvironment}/users/${userId}/roles`, {
                method: 'POST',
                body: JSON.stringify([{ name: roleName }])
            })
            if (result.status === 200) {
                alert(`Successfully added role ${roleName} to user ${userId}`)
            } else {
                throw result.status
            }
        } catch (err) {
            alert('Failed to add role to user. Please ensure you have entered a valid user id.')
        } finally {
            event.target.reset()
            setAssigningRole(false)
        }
    }

    const handleRoleDelete = async (roleName) => {
        setDeletingRole(true);
        try {
            const result = await fetch(`/api/integrations/${selectedIntegration.id}/${selectedEnvironment}/roles/${roleName}`, {
                method: 'DELETE',
            })
            if (result.status === 200) {
                const newRoles = {...roles}
                newRoles.data = newRoles.data.filter(role => role.name !== roleName)
                setRoles(newRoles)
                alert(`Successfully deleted role ${roleName}.`)
            } else if (result.status === 404) {
                alert('Role not found.')
            } else {
                throw result.status
            }
        } catch (err) {
            alert('Failed to delete role. Please try again.')
        } finally {
            setDeletingRole(false)
        }
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
        <div>
            <p><em>You can use this section to create roles, delete roles, and assign roles to users. If unsure of a user ID, you can use the section to the right to look up IDIR users by their name or email.</em></p>
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
                                <th>Delete Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles && roles.data.map(role => (
                                <tr key={role.name}>
                                    <td>{role.name}</td>
                                    <td>{String(role.composite)}</td>
                                    <td>
                                        <form onSubmit={(e) => handleUserSubmit(e, role.name)}>
                                            <label htmlFor={`${role.name}-user-input`} title={'Example: abcdefghijklmnopqrstuvwxyz123456@idir'}>User ID: &nbsp;</label>
                                            <input name='userId' id={`${role.name}-user-input`}/>
                                            <button disabled={assigningRole}>Assign</button>
                                        </form>
                                    </td>
                                    <td>
                                        <button onClick={() => handleRoleDelete(role.name)} disabled={deletingRole}>Delete Role</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <br />
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
        </div>
    )
}