import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getNetworkOperatorByProjectCode } from "../../services/NetworkOperadorService";
import { NetworkOperator } from "../../types/networkOperador";

const NetworkOperatorDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [networkOperator, setNetworkOperator] = useState<NetworkOperator | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNetworkOperator = async () => {
      try {
        if (!code) return;
        const response = await getNetworkOperatorByProjectCode(code);
        setNetworkOperator(response.data);
      } catch (error: any) {
        console.error("Error al obtener operador de red:", error);
        toast.error(
          error.response?.data?.message || "No se encontró información del operador de red"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNetworkOperator();
  }, [code]);

  if (loading) return <div className="container mt-4">Cargando...</div>;

  if (!networkOperator)
    return (
      <div className="container mt-4">
        <p>No se encontró información del operador de red para el proyecto <strong>{code}</strong>.</p>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">← Volver</button>
      </div>
    );

  const renderDate = (date?: string | null) =>
    date ? new Date(date).toLocaleDateString() : "Sin fecha";

  return (
    <div className="container mt-4">
      <h3>Operador de Red - Proyecto {code}</h3>

      <ul className="list-group">
        <li className="list-group-item">
          <strong>Fecha de Solicitud:</strong> {renderDate(networkOperator.applicationDateOr)}
        </li>
        <li className="list-group-item">
          <strong>Número de Solicitud:</strong> {networkOperator.applicationNumberOr || "N/A"}
        </li>
        <li className="list-group-item">
          <strong>Nombre del Operador:</strong> {networkOperator.nameOr || "N/A"}
        </li>
        <li className="list-group-item">
          <strong>Fecha de Entrega del Medidor:</strong> {renderDate(networkOperator.meterDeliveryDateOr)}
        </li>
        <li className="list-group-item">
          <strong>Fecha de Inspección:</strong> {renderDate(networkOperator.inspectionDateOr)}
        </li>
        <li className="list-group-item">
          <strong>Fecha de Aprobación:</strong> {renderDate(networkOperator.approvalDateOr)}
        </li>
      </ul>

      <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">
        ← Volver
      </button>
    </div>
  );
};

export default NetworkOperatorDetail;
