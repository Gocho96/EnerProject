import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Engineering } from "../types/engineering";
import { getEngineeringByProjectCode } from "../services/EngineeringService";
import axios from "axios";

const EngineeringDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [engineering, setEngineering] = useState<Engineering | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEngineering = async () => {
      try {
        if (!code) return;
        const response = await getEngineeringByProjectCode(code);
        setEngineering(response.data);
      } catch (error: unknown) {
        console.error("Error al obtener información de ingeniería:", error);
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.message ||
              "No se encontró información de ingeniería"
          );
        } else {
          toast.error("Ocurrió un error inesperado");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEngineering();
  }, [code]);

  if (loading) return <div className="container mt-4">Cargando...</div>;

  if (!engineering)
    return (
      <div className="container mt-4">
        <p>
          No se encontró información de ingeniería para el proyecto con código{" "}
          <strong>{code}</strong>.
        </p>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          ← Volver
        </button>
      </div>
    );

  const renderDate = (date?: string | null) => {
    return date ? new Date(date).toLocaleDateString() : "Sin fecha";
  };

  return (
    <div className="container mt-4">
      <h3>Fase de Ingeniería - Proyecto {code}</h3>

      <ul className="list-group">
        <li className="list-group-item">
          <strong>Plano Eléctrico:</strong>{" "}
          {engineering.statusElectricalPlan ? "Sí" : "No"} <br />
          <strong>Fecha:</strong> {renderDate(engineering.dateElectricalPlan)}
        </li>
        <li className="list-group-item">
          <strong>Plano Constructivo:</strong>{" "}
          {engineering.statusConstructionPlan ? "Sí" : "No"} <br />
          <strong>Fecha:</strong>{" "}
          {renderDate(engineering.dateConstructionPlan)}
        </li>
        <li className="list-group-item">
          <strong>Diagrama Unifilar:</strong>{" "}
          {engineering.statusUnifilar ? "Sí" : "No"} <br />
          <strong>Fecha:</strong> {renderDate(engineering.dateUnifilar)}
        </li>
        <li className="list-group-item">
          <strong>Modelo de Planta:</strong>{" "}
          {engineering.statusPlantModel ? "Sí" : "No"} <br />
          <strong>Fecha:</strong> {renderDate(engineering.datePlantModel)}
        </li>
        <li className="list-group-item">
          <strong>Memorias:</strong>{" "}
          {engineering.statusMemories ? "Sí" : "No"} <br />
          <strong>Fecha:</strong> {renderDate(engineering.dateMemories)}
        </li>
      </ul>

      <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">
        ← Volver
      </button>
    </div>
  );
};

export default EngineeringDetail;
