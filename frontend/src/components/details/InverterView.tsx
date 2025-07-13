import React from "react";
import { Inverter, ProjectDetails } from "../../types/projectDetails";

interface Props {
  projectId: string;
  inverters: Inverter[];
  onUpdate: (updated: Partial<ProjectDetails>) => void;
}

const InverterView: React.FC<Props> = ({ inverters }) => {
  return (
    <div className="card p-4 mt-4">
      <h5 className="mb-3">Inversores</h5>

      {inverters.length === 0 ? (
        <p>No hay inversores registrados.</p>
      ) : (
        <ul className="list-group">
          {inverters.map((inv, index) => (
            <li key={index} className="list-group-item">
              <p><strong>Marca:</strong> {inv.inverterBrand || "No especificado"}</p>
              <p><strong>Referencia:</strong> {inv.inverterReference || "No especificado"}</p>
              <p><strong>Potencia:</strong> {inv.inverterPower ?? "No especificado"} W</p>
              <p><strong>Cantidad:</strong> {inv.numberInverter ?? "No especificado"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InverterView;
