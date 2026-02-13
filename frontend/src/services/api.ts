import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;

export interface Candidate {
  uuid: string;
  candidateId: string;
  applicationId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface JobsProps {
  jobId: string,
  title: string,
  uuid: string,
  candidateId: string,
  applicationId: string,
}