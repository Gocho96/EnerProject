import React, { useState } from "react";
import { ProjectDetails } from "../../types/projectDetails";

interface Props {
  details: ProjectDetails;
  onUpdate: (updated: Partial<ProjectDetails>) => void;
}

const GeneralInfoView: React.FC<Props> = ({ details, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<ProjectDetails>>(details);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(formData);
    setEditing(false);
  };

  const handleCancel = () => {
    setFormData(details);
    setEditing(false);
  };

  return (
    <div className="card p-4 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Información General</h5>
        <div>
          {editing ? (
            <>
              <button className="btn btn-sm btn-success me-2" onClick={handleSave}>
                Guardar
              </button>
              <button className="btn btn-sm btn-secondary" onClick={handleCancel}>
                Cancelar
              </button>
            </>
          ) : (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => setEditing(true)}
            >
              Editar
            </button>
          )}
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-md-6">
          <strong>Propietario:</strong>{" "}
          {editing ? (
            <input
              type="text"
              name="projectOwner"
              className="form-control"
              value={formData.projectOwner || ""}
              onChange={handleChange}
            />
          ) : (
            details.projectOwner || "N/A"
          )}
        </div>
        <div className="col-md-3">
          <strong>Tipo de Documento:</strong>{" "}
          {editing ? (
            <input
              type="text"
              name="typeDocument"
              className="form-control"
              value={formData.typeDocument || ""}
              onChange={handleChange}
            />
          ) : (
            details.typeDocument || "N/A"
          )}
        </div>
        <div className="col-md-3">
          <strong>Número:</strong>{" "}
          {editing ? (
            <input
              type="text"
              name="documentNumber"
              className="form-control"
              value={formData.documentNumber || ""}
              onChange={handleChange}
            />
          ) : (
            details.documentNumber || "N/A"
          )}
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-md-6">
          <strong>Dirección:</strong>{" "}
          {editing ? (
            <input
              type="text"
              name="address"
              className="form-control"
              value={formData.address || ""}
              onChange={handleChange}
            />
          ) : (
            details.address || "N/A"
          )}
        </div>
        <div className="col-md-6">
          <strong>Ubicación:</strong>{" "}
          {editing ? (
            <input
              type="text"
              name="location"
              className="form-control"
              value={formData.location || ""}
              onChange={handleChange}
            />
          ) : (
            details.location || "N/A"
          )}
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-md-6">
          <strong>Ciudad:</strong>{" "}
          {editing ? (
            <input
              type="text"
              name="city"
              className="form-control"
              value={formData.city || ""}
              onChange={handleChange}
            />
          ) : (
            details.city || "N/A"
          )}
        </div>
        <div className="col-md-6">
          <strong>Departamento:</strong>{" "}
          {editing ? (
            <input
              type="text"
              name="department"
              className="form-control"
              value={formData.department || ""}
              onChange={handleChange}
            />
          ) : (
            details.department || "N/A"
          )}
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-6">
          <strong>Potencia DC:</strong>{" "}
          {editing ? (
            <input
              type="number"
              name="dcPower"
              className="form-control"
              value={formData.dcPower ?? ""}
              onChange={handleChange}
            />
          ) : (
            details.dcPower ?? "N/A"
          )}{" "}
          kWp
        </div>
        <div className="col-md-6">
          <strong>Potencia AC:</strong>{" "}
          {editing ? (
            <input
              type="number"
              name="acPower"
              className="form-control"
              value={formData.acPower ?? ""}
              onChange={handleChange}
            />
          ) : (
            details.acPower ?? "N/A"
          )}{" "}
          kW
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoView;
