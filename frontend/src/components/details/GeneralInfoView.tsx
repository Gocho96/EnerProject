import React from "react";
import { ProjectDetails } from "../../types/projectDetails";

interface Props {
  details: ProjectDetails;
  onUpdate: (updated: Partial<ProjectDetails>) => void;
}

const GeneralInfoView: React.FC<Props> = ({ details }) => {
  return (
    <div className="card p-4 mt-4">
      <h5 className="mb-3">Información General</h5>

      <div className="row mb-2">
        <div className="col-md-6">
          <strong>Propietario:</strong> {details.projectOwner || "N/A"}
        </div>
        <div className="col-md-3">
          <strong>Tipo de Documento:</strong> {details.typeDocument || "N/A"}
        </div>
        <div className="col-md-3">
          <strong>Número:</strong> {details.documentNumber || "N/A"}
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-md-6">
          <strong>Dirección:</strong> {details.address || "N/A"}
        </div>
        <div className="col-md-6">
          <strong>Ubicación:</strong> {details.location || "N/A"}
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-md-6">
          <strong>Ciudad:</strong> {details.city || "N/A"}
        </div>
        <div className="col-md-6">
          <strong>Departamento:</strong> {details.department || "N/A"}
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-6">
          <strong>Potencia DC:</strong> {details.dcPower ?? "N/A"} kWp
        </div>
        <div className="col-md-6">
          <strong>Potencia AC:</strong> {details.acPower ?? "N/A"} kW
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoView;
