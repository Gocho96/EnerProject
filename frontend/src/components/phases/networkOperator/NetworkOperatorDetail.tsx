import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getNetworkOperatorByProjectCode,
  updateNetworkOperator,
} from "../../../services/NetworkOperadorService";
import { NetworkOperator } from "../../../types/networkOperador";

const NetworkOperatorDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [networkOperator, setNetworkOperator] = useState<NetworkOperator | null>(null);
  const [formData, setFormData] = useState<Partial<NetworkOperator>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNetworkOperator = async () => {
      try {
        if (!code) return;
        const response = await getNetworkOperatorByProjectCode(code);
        setNetworkOperator(response.data);
        setFormData(response.data);
      } catch (error: any) {
        console.error("Error al obtener operador de red:", error);
        toast.error(
          error.response?.data?.message ||
            "No se encontró información del operador de red"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNetworkOperator();
  }, [code]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? undefined : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!networkOperator?._id) return;

    try {
      const updated = await updateNetworkOperator(networkOperator._id, formData);
      setNetworkOperator(updated.data);
      toast.success("Información del operador de red actualizada correctamente");
    } catch (error: any) {
      console.error("Error al actualizar operador de red:", error);
      toast.error("Error al actualizar la información");
    }
  };

  const renderInputDate = (label: string, name: keyof NetworkOperator) => (
    <div className="mb-3">
      <label>{label}</label>
      <input
        type="date"
        className="form-control"
        name={name}
        value={formData[name]?.toString().split("T")[0] || ""}
        onChange={handleChange}
      />
    </div>
  );

  const renderInputText = (
    label: string,
    name: keyof NetworkOperator,
    type: "text" | "number" = "text"
  ) => (
    <div className="mb-3">
      <label>{label}</label>
      <input
        type={type}
        className="form-control"
        name={name}
        value={formData[name]?.toString() || ""}
        onChange={handleChange}
      />
    </div>
  );

  if (loading) return <div className="container mt-4">Cargando...</div>;

  if (!networkOperator)
    return (
      <div className="container mt-4">
        <p>
          No se encontró información del operador de red para el proyecto{" "}
          <strong>{code}</strong>.
        </p>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          ← Volver
        </button>
      </div>
    );

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h3 className="mb-4">Operador de Red - Proyecto {code}</h3>
      <form onSubmit={handleSubmit}>
        {renderInputDate("Fecha de Solicitud", "applicationDateOr")}
        {renderInputText("Número de Solicitud", "applicationNumberOr")}
        {renderInputText("Nombre del Operador", "nameOr")}
        {renderInputDate("Fecha de Entrega del Medidor", "meterDeliveryDateOr")}
        {renderInputDate("Fecha de Inspección", "inspectionDateOr")}
        {renderInputDate("Fecha de Aprobación", "approvalDateOr")}

        <div className="d-flex gap-2 mt-3">
          <button type="submit" className="btn btn-success">
            Guardar Cambios
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

export default NetworkOperatorDetail;
