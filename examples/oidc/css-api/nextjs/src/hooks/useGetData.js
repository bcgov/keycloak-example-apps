import { useState } from 'react'

/**
 * Hook to manage loading and error state on API get requests.
 * 
 * @param {*} defaultData Data to use before fetch is complete 
 * @returns {Object} {data, loadingData, apiError, fetchData}
 */
export default function useGetData(defaultData) {
    const [data, setData] = useState(defaultData);
    const [loadingData, setLoadingData] = useState(false);
    const [apiError, setApiError] = useState(false);

    const fetchData = async (url) => {
        try {
            setData(defaultData);
            setApiError(false);
            setLoadingData(true);
            const fetchedData = await fetch(url)
                .then(res => {
                    if (res.status >= 400) throw res.status
                    return res.json()
                })
            setData(fetchedData)
        } catch (e) {
            setApiError(Number.isInteger(e) ? e : 500)
        } finally {
            setLoadingData(false)
        }
    }

    return {data, loadingData, apiError, fetchData}
}