import { useEffect, useState } from "react"
import api from "../services/api";

export default function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`api/jobs/get-list`);
        setJobs(response.data);
      }
      catch (e: any) {
        setError(e ? e.message : String(e));
      }
      finally {
        setIsLoading(false);
      }
    }

    fetchData()
  }, []);

  if (isLoading) {
    return <h1>Cargando...</h1>
  }

  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <>
      <h1>Jobs List</h1>

      {jobs.map((e: any) => (
        <p key={e.id}>{e.id} - {e.title}</p>
      ))}
    </>
  )
}