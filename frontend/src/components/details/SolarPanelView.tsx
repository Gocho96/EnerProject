import React from "react";
import { SolarPanel, ProjectDetails } from "../../types/projectDetails";

interface Props {
  projectId: string;
  panels: SolarPanel[];
  onUpdate: (updated: Partial<ProjectDetails>) => void;
}

const SolarPanelView: React.FC<Props> = ({ panels }) => {
  return (
    <div className="card p-4 mt-4">
      <h5 className="mb-3">Paneles Solares</h5>

      {panels.length === 0 ? (
        <p>No hay paneles solares registrados.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Potencia</th>
                <th>Marca</th>
                <th>Referencia</th>
              </tr>
            </thead>
            <tbody>
              {panels.map((panel, idx) => (
                <tr key={idx}>
                  <td>{panel.numberPanels ?? "N/A"}</td>
                  <td>{panel.panelPower ?? "N/A"} W</td>
                  <td>{panel.panelBrand || "N/A"}</td>
                  <td>{panel.panelReference || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SolarPanelView;
