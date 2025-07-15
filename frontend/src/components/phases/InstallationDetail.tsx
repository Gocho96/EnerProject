import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Installation } from "../../types/installation";
import { getInstallationByProjectCode } from "../../services/InstallationService";

const InstallationDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [installation, setInstallation] = useState<Installation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstallation = async () => {
      try {
        if (!code) return;
        const data = await getInstallationByProjectCode(code);
        setInstallation({
          ...data,
          dailyLog: data.dailyLog.filter(
            (log: any) => log && typeof log === "object"
          ),
        });
      } catch (error: any) {
        console.error("Error al obtener instalación:", error);
        toast.error(
          error.response?.data?.message ||
            "Error al obtener datos de instalación"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInstallation();
  }, [code]);

  if (loading) return <div className="container mt-4">Cargando...</div>;

  if (!installation)
    return (
      <div className="container mt-4">
        <p>
          No se encontró información de instalación para el proyecto con código{" "}
          <strong>{code}</strong>.
        </p>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          ← Volver
        </button>
      </div>
    );

  return (
    <div className="container mt-4">
      <h3>Fase de Instalación - Proyecto {code}</h3>

      <h5>Bitácoras Registradas</h5>
      {installation.dailyLog.length === 0 ? (
        <p>No hay bitácoras registradas.</p>
      ) : (
        <ul className="list-group">
          {installation.dailyLog.map((log, index) => {
            if (!log || typeof log !== "object") return null;

            return (
              <li key={(log as any)._id || index} className="list-group-item">
                <strong>Fecha:</strong>{" "}
                {log.date
                  ? new Date(log.date).toLocaleDateString()
                  : "Sin fecha"}{" "}
                <br />
                <strong>Contenido:</strong> {log.content || "Sin contenido"}{" "}
                <br />
                <strong>Novedades:</strong>{" "}
                {log.installationNews || "Sin novedades"}
              </li>
            );
          })}
        </ul>
      )}

      <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">
        ← Volver
      </button>
    </div>
  );
};

export default InstallationDetail;
