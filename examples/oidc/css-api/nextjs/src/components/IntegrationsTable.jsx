import styles from '@/styles/Home.module.css'

export default function IntegrationsTable({ integrations }) {
    return (
        <div>
            <table className={styles.bordered}>
                <thead>
                    <tr>
                        <th>Integration ID</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Environments</th>
                    </tr>
                </thead>
                <tbody>
                    {integrations.map(integration => (
                        <tr key={integration.id}>
                            <td>{integration.id}</td>
                            <td>{integration.projectName}</td>
                            <td>{integration.status}</td>
                            <td>{new Date(integration.createdAt).toDateString()}</td>
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
        </div>
    )
}
