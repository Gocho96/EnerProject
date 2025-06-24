import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

interface Phase {
  name_phase: string;
  status: string;
}

const FIXED_PHASES: Phase[] = [
  { name_phase: "Documental", status: "Pendiente" },
  { name_phase: "Ingeniería", status: "Pendiente" },
  { name_phase: "Compras", status: "Pendiente" },
  { name_phase: "Instalación", status: "Pendiente" },
  { name_phase: "Incentivos Tributarios", status: "Pendiente" },
  { name_phase: "Retie", status: "Pendiente" },
  { name_phase: "Operador de Red", status: "Pendiente" },
  { name_phase: "Marketing", status: "Pendiente" },
  { name_phase: "Mantenimiento", status: "Pendiente" },
  { name_phase: "Facturación", status: "Pendiente" },
];

const ProjectDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [phases, setPhases] = useState<Phase[]>([]);
  const API_URL = `http://localhost:3000/api/proyectos/${code}/phases`;

  useEffect(() => {
    const fetchPhases = async () => {
      try {
        const response = await axios.get(API_URL);
        const fetchedPhases: Phase[] = response.data || [];

        const mergedPhases = FIXED_PHASES.map((fixedPhase) => {
          const existingPhase = fetchedPhases.find(
            (phase) => phase.name_phase === fixedPhase.name_phase
          );
          return existingPhase || fixedPhase;
        });

        setPhases(mergedPhases);
      } catch (error) {
        console.error("Error al obtener las fases:", error);
        setPhases(FIXED_PHASES);
      }
    };

    fetchPhases();
  }, [code]);

  return (
    <div className="container mt-4">
      <h3>Fases del Proyecto {code}</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre de la Fase</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {phases.map((phase, index) => (
            <tr key={index}>
              <td>
                <Link to={`/proyectos/${code}/fases/${phase.name_phase}`} className="text-primary">
                  {phase.name_phase}
                </Link>
              </td>
              <td>{phase.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate(-1)} className="btn btn-secondary mb-3">
        ← Volver a Proyectos
      </button>
    </div>
  );
};

export default ProjectDetail;
