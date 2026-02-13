import { useEffect, useState } from "react"
import api, { type Candidate } from "../services/api";
import JobsCard from "./JobsCard";

export default function JobsList({candidate}: {candidate: Candidate}) {
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
    <div className="grid grid-cols-2">
      {jobs.map((e: any) => (
        <JobsCard key={e.id} jobId={e.id} title={e.title} uuid={candidate.uuid} candidateId={candidate.candidateId} applicationId={candidate.applicationId} />
      ))}
    </div>
  )
}