import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Installation, DailyLogEntry } from "../../../types/phases/installation";
import {
  getInstallationByProjectCode,
  createDailyLog,
  updateDailyLogById,
  deleteDailyLog,
} from "../../../services/InstallationService";
import DailyLogForm from "./DailyLogForm";

const parseLocalDate = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0);
};

const InstallationDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const [installation, setInstallation] = useState<Installation | null>(null);
  const [loading, setLoading] = useState(true);

  const [newLog, setNewLog] = useState<DailyLogEntry>({
    date: new Date().toISOString().split("T")[0],
    content: "",
    installationNews: "",
  });

  const [showNewLogForm, setShowNewLogForm] = useState(false);
  const [editingLogId, setEditingLogId] = useState<string | null>(null);
  const [editLog, setEditLog] = useState<DailyLogEntry | null>(null);

  useEffect(() => {
    const fetchInstallation = async () => {
      try {
        if (!code) return;
        const installationData = await getInstallationByProjectCode(code);

        setInstallation({
          ...installationData,
          dailyLog: Array.isArray(installationData.dailyLog)
            ? installationData.dailyLog.filter((log: any) => log && typeof log === "object")
            : [],
        });
      } catch (error: any) {
        console.error("Error al obtener instalación:", error);
        toast.error(
          error.response?.installationData?.message ||
            "Error al obtener datos de instalación"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInstallation();
  }, [code]);

  const handleAddLog = async () => {
    try {
      if (!installation?._id) return;

      const createdLog = await createDailyLog(
        installation._id, 
        {
        ...newLog,
        date: parseLocalDate(newLog.date).toISOString(),
      }
      );

      setInstallation((prev) =>
        prev
          ? {
              ...prev,
              dailyLog: [...prev.dailyLog, createdLog],
            }
          : prev
      );

      setNewLog({
        date: new Date().toISOString().split("T")[0],
        content: "",
        installationNews: "",
      });
      setShowNewLogForm(false);
      toast.success("Bitácora agregada");
    } catch (err: any) {
      console.error("Error al crear bitácora:", err);
      console.log("Respuesta backend:", err.response?.data);

      const data = err.response?.data;

      if (data?.errors && Array.isArray(data.errors)) {
        data.errors.forEach((error: any) => {
          toast.error(error.message || "Error de validación");
        });
      } else if (data?.message) {
        toast.error(data.message);
      } else {
        toast.error("Error bitácora");
      }
    }
  };

  const handleUpdateLog = async (logId: string) => {
    try {
      if (!installation || !editLog) return;
      const updatedLog = await updateDailyLogById(installation._id, logId, {
        ...editLog,
        date: parseLocalDate(editLog.date).toISOString(),
      });

      setInstallation({
        ...installation,
        dailyLog: Array.isArray(installation?.dailyLog)
          ? installation.dailyLog.filter(
              (log: any) => log && typeof log === "object"
            )
          : [],
      });

      setEditingLogId(null);
      setEditLog(null);
      toast.success("Bitácora actualizada");
    } catch (err) {
      toast.error("Error al actualizar bitácora");
    }
  };

  const handleDeleteLog = async (logId: string) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar esta bitácora?"
    );
    if (!confirmed) return;

    try {
      if (!installation) return;
      await deleteDailyLog(installation._id, logId);
      setInstallation((prev) =>
        prev
          ? {
              ...prev,
              dailyLog: prev.dailyLog.filter((log) => log?._id !== logId),
            }
          : null
      );
      toast.success("Bitácora eliminada");
    } catch (err) {
      toast.error("Error al eliminar bitácora");
    }
  };

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

      <div className="mt-4">
        <button
          className="btn btn-success mb-3"
          onClick={() => setShowNewLogForm(true)}
          disabled={showNewLogForm}
        >
          Agregar bitácora
        </button>

        {showNewLogForm && (
          <DailyLogForm
            log={newLog}
            onChange={setNewLog}
            onSubmit={handleAddLog}
            onCancel={() => {
              setShowNewLogForm(false);
              setNewLog({
                date: new Date().toISOString().split("T")[0],
                content: "",
                installationNews: "",
              });
            }}
            submitLabel="Guardar bitácora"
          />
        )}
      </div>

      <h5>Bitácoras Registradas</h5>
      {installation.dailyLog.length === 0 ? (
        <p>No hay bitácoras registradas.</p>
      ) : (
        <ul className="list-group">
          {installation.dailyLog.map((log) => {
            if (!log) return null; // evitar null

            const isEditing = editingLogId === log._id;

            return (
              <li key={log._id} className="list-group-item">
                {isEditing && editLog ? (
                  <DailyLogForm
                    log={editLog}
                    onChange={setEditLog}
                    onSubmit={() => handleUpdateLog(log._id!)}
                    onCancel={() => {
                      setEditingLogId(null);
                      setEditLog(null);
                    }}
                    submitLabel="Actualizar"
                  />
                ) : (
                  <>
                    <p>
                      <strong>Fecha:</strong>{" "}
                      {log.date
                        ? new Date(log.date).toLocaleDateString()
                        : "Sin fecha"}
                    </p>
                    <p>
                      <strong>Contenido:</strong>{" "}
                      {log.content || "Sin contenido"}
                    </p>
                    <p>
                      <strong>Novedades:</strong>{" "}
                      {log.installationNews || "Sin novedades"}
                    </p>
                    <button
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => {
                        setEditingLogId(log._id!);
                        setEditLog({
                          _id: log._id,
                          date: log.date?.split("T")[0] || "",
                          content: log.content,
                          installationNews: log.installationNews,
                        });
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDeleteLog(log._id!)}
                    >
                      Eliminar
                    </button>
                  </>
                )}
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
