import { useState } from "react"
import api, { type JobsProps } from "../services/api"


export default function JobsCard({ jobId, title, uuid, candidateId, applicationId }: JobsProps) {
  const [repoUrl, setRepoUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      uuid: uuid,
      jobId: jobId,
      candidateId: candidateId,
      repoUrl: repoUrl,
      applicationId: applicationId,
    }

    console.log(payload);

    try {
      setIsSubmitting(true);
      setError("");

      const response = await api.post("api/candidate/apply-to-job", payload, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.data.ok) {
        alert("Se envió con éxito");
      }
    }
    catch (e: any) {
      const errorMessage = e.response?.data?.message || e.message || "Error al enviar la postulación";
      setError(errorMessage);
      alert(errorMessage);
    }
    finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div key={jobId} className="w-full max-w-4xl mx-auto my-8 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden">
      <div className="flex flex-col md:flex-row">

        {/* Lado izquierdo: Info del puesto */}
        <div className="p-8 bg-slate-50 md:w-1/3 border-b md:border-b-0 md:border-r border-gray-100">
          <h1 className="mt-4 text-2xl font-extrabold text-gray-900 leading-tight">
            {title}
          </h1>
        </div>

        {/* Lado derecho: Formulario */}
        <div className="p-8 md:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Enlace del Repositorio (GitHub)
              </label>
              <div className="relative">
                <input
                  type="url"
                  placeholder="https://github.com/usuario/proyecto"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  required
                  className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                />
              </div>
              <p className="mt-2 text-xs text-gray-400">
                Asegúrate de que el repositorio sea público o tengamos acceso.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-sm font-bold rounded-xl text-white bg-gray-900 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg"
            >
              Enviar Postulación
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}