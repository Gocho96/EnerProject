import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getRetieByProjectCode,
  updateRetie,
} from "../../../services/RetieService";
import { Retie } from "../../../types/phases/retie";

const RetieDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [retie, setRetie] = useState<Retie | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<Retie>>({});

  useEffect(() => {
    const fetchRetie = async () => {
      try {
        if (!code) return;
        const response = await getRetieByProjectCode(code);
        setRetie(response.data);
        setFormData(response.data);
      } catch (error: any) {
        console.error("Error al obtener información RETIE:", error);
        toast.error(
          error?.response?.data?.message || "No se encontró información RETIE"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRetie();
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
    if (!retie?._id) return;

    try {
      const updated = await updateRetie(retie._id, formData);
      setRetie(updated.data);
      toast.success("Información RETIE actualizada correctamente");
    } catch (error: any) {
      console.error("Error al actualizar RETIE:", error);
      toast.error("Error al actualizar la información");
    }
  };

  const renderInputDate = (label: string, name: keyof Retie) => (
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
    name: keyof Retie,
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

  if (!retie)
    return (
      <div className="container mt-4">
        <p>No se encontró información RETIE para el proyecto <strong>{code}</strong>.</p>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">← Volver</button>
      </div>
    );

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h3 className="mb-4">Fase RETIE - Proyecto {code}</h3>
      <form onSubmit={handleSubmit}>
        {renderInputDate("Fecha de Solicitud", "applicationDateRetie")}
        {renderInputText("Número de Oferta Comercial", "commercialOfferNumberRetie", "number")}
        {renderInputText("Proveedor", "supplierRetie")}
        {renderInputDate("Fecha de Pago", "paymentDateRetie")}
        {renderInputDate("Fecha de Inspección", "inspectionDateRetie")}
        {renderInputDate("Fecha de Dictamen", "dictamenDateRetie")}
        {renderInputText("Número de Dictamen", "dictamenNumberRetie", "number")}

        <div className="d-flex gap-2 mt-3">
          <button type="submit" className="btn btn-success">Guardar Cambios</button>
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

export default RetieDetail;
