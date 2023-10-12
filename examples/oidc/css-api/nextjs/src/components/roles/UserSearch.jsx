import { useState } from "react";
import useGetData from "@/hooks/useGetData";
import styles from '@/styles/Users.module.css'

export default function UserSearch({ selectedEnvironment }) {
    const { data: users, loadingData: loadingUsers, apiError: fetchUsersError, fetchData: fetchUsers } = useGetData(null);
    const [userIDs, setUserIDs] = useState(null);
    const [notFound, setNotFound] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setNotFound(false);
        setUserIDs(null)
        const formData = Object.fromEntries(new FormData(e.target));
        let searchURL = `/api/${selectedEnvironment}/idir/users?`;
        Object.entries(formData).forEach(([key, val]) => {
            if (val) searchURL += `${key}=${val}&`
        })
        const users = await fetchUsers(searchURL)
        if (!users?.data?.length) {
            setNotFound(true)
        } else {
            setUserIDs(users.data?.map(user => user.username))
        }
    }

    return (
        <div>
            <h3 className='m-0'>Find an IDIR User ID</h3>
            <p><em>Search for an idir user by any of the below criteria. Only users that have logged into this client can be found. This is a demonstration of integrating with IDIR, but if you have selected an integration with another IDP the same logic can be used. See <a target='_blank' href="https://api.loginproxy.gov.bc.ca/openapi/swagger">the swagger docs</a> for using other IDPs.</em></p>
            <form onSubmit={handleSubmit} className={styles['form-container']}>
                <label htmlFor='firstName'>First Name: &nbsp;</label>
                <input id='firstName' name='firstName' />
                <label htmlFor='lastName'>Last Name: &nbsp;</label>
                <input id='lastName' name='lastName' />
                <label htmlFor='email'>Email: &nbsp;</label>
                <input id='email' name='email' />

                <button type="submit" disabled={loadingUsers}>Search</button>
                {loadingUsers && (
                    <p>Loading...</p>
                )}
                {fetchUsersError && (
                    <p>Error fetching users, please try again.</p>
                )}
                {notFound && (
                    <p>No users found for search criteria. Only users that have logged in to your client can be returned.</p>
                )}
                {userIDs && (
                    <>
                        <h4 className='m-0'>Found users:</h4>
                        <ul>
                            {userIDs.map(user => (
                                <>
                                    <li>{user}</li>
                                </>
                                ))}
                        </ul>
                    </>
                )}
            </form>
        </div>
    )
}