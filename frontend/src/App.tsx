import { useEffect, useState } from 'react';
import './App.css'

import JobsList from './components/JobsList'
import api, { type Candidate } from './services/api';

function App() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`api/candidate/get-by-email?email=fonsecaignacio139@gmail.com`);
        setCandidate(response.data);
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
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-full shadow-sm">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600 font-medium">Cargando candidato...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto my-10 p-8 bg-red-50 border-l-4 border-red-500 rounded-r-2xl">
        <h2 className="text-red-800 font-bold text-lg">Error de sistema</h2>
        <p className="text-red-600 mt-1">{error}</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50">
      <div className="space-y-2 mb-10">
        <h1 className="text-5xl">
          Nimble Gravity Challenge
        </h1>
        <h2 className="text-3xl">
          {candidate?.firstName} {candidate?.lastName}
        </h2>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg">
          <span className="text-xs text-gray-400">UUID: </span>
          <code className="text-sm text-blue-600">{candidate?.candidateId}</code>
        </div>
      </div>

      <div className="bg-white">
        {candidate && <JobsList candidate={candidate} />}
      </div>

      <div className="flex justify-center w-full">
        <div className='items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg shadow-md'>
          <span className='text-sm'>Hecho por <a className='text-blue-600 underline' href='https://www.linkedin.com/in/ignacio-fonseca-7b5a96263/' target="_blank">Ignacio Fonseca</a></span>
        </div>
      </div>
    </div>
  )
}

export default App;
