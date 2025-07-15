import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getMaintenancesByProjectCode } from "../../services/MaintenanceService";
import { Maintenance } from "../../types/maintenance";

const MaintenanceDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [maintenanceData, setMaintenanceData] = useState<Maintenance | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        if (!code) return;
        const data = await getMaintenancesByProjectCode(code);
        setMaintenanceData(data);
      } catch (error: any) {
        console.error("Error al obtener información de mantenimiento:", error);
        toast.error(
          error.message || "No se pudo obtener la información de mantenimiento"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenance();
  }, [code]);

  const renderDate = (date?: string) =>
    date ? new Date(date).toLocaleDateString() : "Sin fecha";

  if (loading) return <div className="container mt-4">Cargando...</div>;

  if (!maintenanceData)
    return (
      <div className="container mt-4">
        <p>
          No se encontró información de mantenimiento para el proyecto{" "}
          <strong>{code}</strong>.
        </p>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          ← Volver
        </button>
      </div>
    );

  return (
    <div className="container mt-4">
      <h3>Mantenimientos - Proyecto {code}</h3>

      <p>
        <strong>Frecuencia (meses):</strong>{" "}
        {maintenanceData.maintenanceFrequency}
      </p>
      <p>
        <strong>Próximo mantenimiento:</strong>{" "}
        {renderDate(maintenanceData.nextMaintenance)}
      </p>

      <hr />

      <h5 className="mt-4">Historial de Mantenimientos</h5>
      <ul className="list-group">
        {maintenanceData.maintenance.map((entry) => (
          <li key={entry._id} className="list-group-item">
            <p>
              <strong>Mantenimiento #{entry.maintenanceNumber}</strong>
            </p>
            <p>
              <strong>Fecha:</strong> {renderDate(entry.maintenanceDate)}
            </p>
            <p>
              <strong>Tipo:</strong> {entry.typeMaintenance || "N/A"}
            </p>
            <p>
              <strong>Fecha Informe:</strong>{" "}
              {renderDate(entry.maintenanceReportDate)}
            </p>
            <p>
              <strong>Fecha Factura:</strong>{" "}
              {renderDate(entry.maintenanceInvoiceDate)}
            </p>
            <p>
              <strong>Notas:</strong> {entry.maintenanceNotes || "N/A"}
            </p>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate(-1)} className="btn btn-secondary mt-4">
        ← Volver
      </button>
    </div>
  );
};

export default MaintenanceDetail;
