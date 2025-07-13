import React from "react";
import { Battery, ProjectDetails } from "../../types/projectDetails";

interface Props {
  projectId: string;
  batteries: Battery[];
  onUpdate: (updated: Partial<ProjectDetails>) => void;
}

const BatteryView: React.FC<Props> = ({ batteries }) => {
  return (
    <div className="card p-4 mt-4">
      <h5 className="mb-3">Baterías Registradas</h5>

      {batteries.length === 0 ? (
        <p>No hay baterías registradas.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Cantidad</th>
                <th>Amperaje</th>
                <th>Voltaje</th>
                <th>Marca</th>
                <th>Referencia</th>
              </tr>
            </thead>
            <tbody>
              {batteries.map((battery, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{battery.numberBattery ?? "-"}</td>
                  <td>{battery.batteryAmperage ?? "-"} A</td>
                  <td>{battery.batteryVoltage ?? "-"} V</td>
                  <td>{battery.batteryBrand ?? "-"}</td>
                  <td>{battery.batteryReference ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BatteryView;
