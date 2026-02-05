import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Engineering } from "../../../types/phases/engineering";
import {
  getEngineeringByProjectCode,
  updateEngineering,
} from "../../../services/EngineeringService";
import axios from "axios";

const EngineeringDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [engineering, setEngineering] = useState<Engineering | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const handleChange = (field: keyof Engineering, value: boolean | string) => {
    if (!engineering) return;
    const updated = { ...engineering, [field]: value };
    if (
      typeof value === "boolean" &&
      field.startsWith("status") &&
      value === false
    ) {
      const dateField = field.replace("status", "date") as keyof Engineering;

      if (dateField in updated) {
        (updated as any)[dateField] = null;
      }
    }
    setEngineering(updated);
  };

const handleSave = async () => {
  if (!engineering || !engineering._id) return;

  try {
    setSaving(true);
    await updateEngineering(engineering._id, engineering);
    toast.success("Datos de ingeniería actualizados");
  } catch (error: any) {
    console.error("Error al actualizar ingeniería:", error);

    const response = error?.response?.data;

    if (Array.isArray(response?.errors)) {
      response.errors.forEach((err: any) => {
        const path = Array.isArray(err.path) ? err.path[0] : "";
        const message = err.message || "Error de validación";
        toast.error(`${path}: ${message}`);
      });
    } else if (Array.isArray(response?.error)) {
      response.error.forEach((msg: string) => toast.error(msg));
    } else if (response?.message) {
      toast.error(response.message);
    } else {
      toast.error("Error al guardar cambios");
    }
  } finally {
    setSaving(false);
  }
};

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

  return (
    <div className="container mt-4">
      <h3>Fase de Ingeniería - Proyecto {code}</h3>

      <form>
        <div className="list-group">
          {[
            {
              label: "¿Se cuenta con el diseño del plano electrico?",
              statusField: "statusElectricalPlan",
              dateField: "dateElectricalPlan",
            },
            {
              label: "¿Se cuenta con el diseño del plano constructivo?",
              statusField: "statusConstructionPlan",
              dateField: "dateConstructionPlan",
            },
            {
              label: "¿Se cuenta con el diagrama unifilar?",
              statusField: "statusUnifilar",
              dateField: "dateUnifilar",
            },
            {
              label: "¿Se realizó un modelado de la planta?",
              statusField: "statusPlantModel",
              dateField: "datePlantModel",
            },
            {
              label: "¿Ya están listas las memorias de calculo?",
              statusField: "statusMemories",
              dateField: "dateMemories",
            },
          ].map((item, index) => (
            <div className="list-group-item" key={index}>
              <div className="mb-2">
                <label className="form-label" htmlFor={item.statusField}>
                  {item.label}
                </label>
                <select
                  id={item.statusField}
                  className="form-select"
                  value={
                    engineering[item.statusField as keyof Engineering]
                      ? "Sí"
                      : "No"
                  }
                  onChange={(e) =>
                    handleChange(
                      item.statusField as keyof Engineering,
                      e.target.value === "Sí"
                    )
                  }
                >
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>
              <label className="form-label">Fecha de elaboración</label>
              <input
                type="date"
                className="form-control"
                value={
                  engineering[item.dateField as keyof Engineering]
                    ? new Date(
                        engineering[
                          item.dateField as keyof Engineering
                        ] as string
                      )
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  handleChange(
                    item.dateField as keyof Engineering,
                    e.target.value
                  )
                }
                disabled={!engineering[item.statusField as keyof Engineering]}
              />
            </div>
          ))}
        </div>
        <div className="d-flex gap-2 mt-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            ← Volver
          </button>
        </div>
      </form>
    </div>
  );
};

export default EngineeringDetail;
