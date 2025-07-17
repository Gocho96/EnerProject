import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPhasesByProjectCode,
  updatePhasesByProjectCode,
} from "../../services/PhaseService";
import { Phase, PhaseStatus } from "../../types/phase";
import { toast } from "react-toastify";

interface Props {
  projectCode: string;
}

export const PHASES_MAP = [
  { key: "Documental", label: "Documental" },
  { key: "Engineering", label: "Ingeniería" },
  { key: "Shopping", label: "Compras" },
  { key: "Installation", label: "Instalación" },
  { key: "TaxIncentive", label: "Incentivos Tributarios" },
  { key: "Retie", label: "RETIE" },
  { key: "NetworkOperator", label: "Operador de Red" },
  { key: "Marketing", label: "Marketing" },
  { key: "Maintenance", label: "Mantenimiento" },
  { key: "Billing", label: "Facturación" },
];

const ProjectPhases = ({ projectCode }: Props) => {
  const [phaseData, setPhaseData] = useState<Phase | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhases = async () => {
      try {
        const response = await getPhasesByProjectCode(projectCode);
        console.log("Cargando fases:", response.data);
        setPhaseData(response.data);
      } catch (error) {
        toast.error("No se pudieron cargar las fases del proyecto");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhases();
  }, [projectCode]);

  const handleStatusChange = (key: keyof Phase, value: PhaseStatus) => {
    setPhaseData((prev) =>
      prev
        ? {
            ...prev,
            [key]: {
              ...(typeof prev?.[key] === "object" && prev[key] !== null
                ? prev[key]
                : {}),
              status: value,
            },
          }
        : prev
    );
  };

  const handleSave = async () => {
    if (!phaseData) return;
    try {
      await updatePhasesByProjectCode(projectCode, phaseData);
      toast.success("Fases actualizadas correctamente");
    } catch (error) {
      toast.error("Error al actualizar las fases");
      console.error(error);
    }
  };

  const handlePhaseClick = (phaseKey: string) => {
    navigate(`/project/${projectCode}/phase/${phaseKey}`);
  };

  if (loading) return <p>Cargando fases...</p>;
  if (!phaseData) return <p>No se encontraron fases para este proyecto.</p>;

  return (
    <div className="table-responsive">
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Fase</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {PHASES_MAP.map(({ key, label }) => {
            const currentStatus =
              (phaseData[key as keyof Phase] as any)?.status || "N/A";
            return (
              <tr key={key}>
                <td
                  style={{
                    cursor: "pointer",
                    color: "#0d6efd",
                    textDecoration: "underline",
                  }}
                  onClick={() => handlePhaseClick(key)}
                >
                  {label}
                </td>
                <td>
                  <select
                    className="form-select"
                    value={currentStatus}
                    onChange={(e) =>
                      handleStatusChange(
                        key as keyof Phase,
                        e.target.value as PhaseStatus
                      )
                    }
                  >
                    <option value="En progreso">En progreso</option>
                    <option value="Pausado">Pausado</option>
                    <option value="Completado">Completado</option>
                    <option value="N/A">N/A</option>
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button className="btn btn-success mt-2" onClick={handleSave}>
        Guardar cambios
      </button>

      <button onClick={() => navigate(-1)} className="btn btn-secondary">
        ← Volver
      </button>
    </div>
  );
};

export default ProjectPhases;
