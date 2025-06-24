import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const phaseFields: Record<string, string[]> = {
  Documental: ["Nro de contrato", "Fecha acta de inicio"],
  Ingeniería: ["Planos constructivos", "Planos eléctricos", "Diagrama unifilar"],
  Compras: ["Cantidad de materiales", "Descripción de materiales"],
  Instalación: ["Avance del día"],
  "Incentivos Tributarios": ["Fecha de radicado", "Nro radicado"],
  RETIE: ["Fecha de dictamen", "Nro de dictamen"],
  "Operador de Red": ["Fecha de visita", "Fecha de instalación medidor"],
  Marketing: ["Link Instagram", "Link Facebook", "Link Linkedin"],
  Mantenimiento: ["Último mantenimiento", "Próximo mantenimiento"],
  Facturación: ["Fecha de factura", "Nro de factura"],
};

const PhaseDetail: React.FC = () => {
  const { code, phase } = useParams<{ code: string; phase?: string }>();
  const navigate = useNavigate();

  // Estado para almacenar la información del formulario
  const [formData, setFormData] = useState<Record<string, string>>(
    phase && phaseFields[phase]
      ? Object.fromEntries(phaseFields[phase].map((field) => [field, ""]))
      : {}
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Manejar cambios en los inputs
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const API_URL = `http://localhost:3000/api/proyectos/${code}/phases/${phase}`;
      await axios.post(API_URL, formData);

      alert("Información guardada correctamente.");
      navigate(-1); // Regresar a la vista de fases
    } catch (err) {
      console.error("Error al guardar los datos:", err);
      setError("Hubo un problema al guardar los datos. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Detalles de la Fase: {phase}</h3>
      <h5>Proyecto: {code}</h5>
      {error && <p className="text-danger">{error}</p>}
      
      {phase && phaseFields[phase] ? (
        <form onSubmit={handleSubmit}>
          {phaseFields[phase].map((field, index) => (
            <div className="mb-3" key={index}>
              <label className="form-label">{field}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
          ))}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </form>
      ) : (
        <p>No hay detalles disponibles.</p>
      )}

      <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">
        ← Volver a Fases
      </button>
    </div>
  );
};

export default PhaseDetail;
