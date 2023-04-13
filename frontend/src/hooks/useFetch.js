import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            try {
                const res = await fetch(url)
                const dataObject = await res.json()
                const json = await Object.entries(dataObject.data)
                // const json = await res.json()

                // console.log("review: ", json[0], "type of ", typeof json);   
                // console.log("id of one review: ", json[0][0], "type of ", typeof json);   

                setData(json)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }

        fetchData()
    }, [url])

    return { loading, error, data }
}

export default useFetch;