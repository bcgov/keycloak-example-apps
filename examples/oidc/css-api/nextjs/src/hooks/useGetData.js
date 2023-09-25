import { useEffect, useState } from 'react'

export default function useGetData(defaultData) {
    const [data, setData] = useState(defaultData);
    const [loadingData, setLoadingData] = useState(false);
    const [apiError, setApiError] = useState(false);

    const fetchData = async (url) => {
        try {
            setLoadingData(true);
            const fetchedData = await fetch(url)
                .then(res => {
                    if (res.status >= 300) throw 'Request failure'
                    return res.json()
                })
            setData(fetchedData.data)
        } catch {
            setApiError(true)
        } finally {
            setLoadingData(false)
        }
    }

    return {data, loadingData, apiError, fetchData}
}