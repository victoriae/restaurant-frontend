import { useState, useEffect } from 'react'
import Axios from 'axios'

const useFetch = (url, initialState) => {
  const [data, setData] = useState(initialState)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const getData = () => {
    setLoading(true)

    Axios(url)
      .then(response => setData(response.data))
      .catch(error => setError(error))
      .then(() => setLoading(loading))
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getData(),[])

  return {
    data,
    error,
    loading
  }
}

export default useFetch