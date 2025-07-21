import React, { useState } from "react";
import { toast } from "react-toastify";
import { Battery, ProjectDetails } from "../../types/projectDetails";
import BatteryForm from "./BatteryForm";
import {
  addBattery,
  updateBattery,
  deleteBattery,
} from "../../services/ProjectDetailsService";

interface Props {
  projectId: string;
  batteries: Battery[];
  onUpdate: (updated: Partial<ProjectDetails>) => void;
}

const BatteryView: React.FC<Props> = ({ projectId, batteries, onUpdate }) => {
  const [newBattery, setNewBattery] = useState<Battery>({});
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedBattery, setEditedBattery] = useState<Battery>({});

  const handleAdd = async () => {
    try {
      const updatedProject = await addBattery(projectId, newBattery);
      onUpdate({ batteries: updatedProject.batteries });
      setNewBattery({});
      toast.success("Batería agregada");
    } catch (error: any) {
      toast.error(error.message || "Error al agregar batería");
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditedBattery(batteries[index]);
  };

  const handleUpdate = async (data: Battery) => {
    const batteryId = (batteries[editingIndex!] as any)._id;
    try {
      const updatedProject = await updateBattery(projectId, batteryId, data);
      onUpdate({ batteries: updatedProject.batteries });
      toast.success("Batería actualizada");
      setEditingIndex(null);
    } catch (error: any) {
      toast.error(error.message || "Error al actualizar batería");
    }
  };

  const handleDelete = async (index: number) => {
    const batteryId = (batteries[index] as any)._id;
    try {
      const updatedProject = await deleteBattery(projectId, batteryId);
      onUpdate({ batteries: updatedProject.batteries });
      toast.success("Batería eliminada");
    } catch (error: any) {
      toast.error(error.message || "Error al eliminar batería");
    }
  };

  return (
    <div className="card p-4 mt-4">
      <h5 className="mb-3">Baterías</h5>

      {batteries.length === 0 ? (
        <p>No hay baterías registradas.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Amperaje</th>
                <th>Voltaje</th>
                <th>Marca</th>
                <th>Referencia</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {batteries.map((battery, idx) => (
                <tr key={idx}>
                  {editingIndex === idx ? (
                    <td colSpan={6}>
                      <BatteryForm data={editedBattery} onChange={setEditedBattery} />
                      <div className="mt-2">
                        <button
                          className="btn btn-success me-2"
                          onClick={() => handleUpdate(editedBattery)}
                        >
                          Guardar
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => setEditingIndex(null)}
                        >
                          Cancelar
                        </button>
                      </div>
                    </td>
                  ) : (
                    <>
                      <td>{battery.numberBattery ?? "N/A"}</td>
                      <td>{battery.batteryAmperage ?? "N/A"} A</td>
                      <td>{battery.batteryVoltage ?? "N/A"} V</td>
                      <td>{battery.batteryBrand || "N/A"}</td>
                      <td>{battery.batteryReference || "N/A"}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleEdit(idx)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(idx)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <hr />
      <h6>Agregar nueva batería</h6>
      <BatteryForm data={newBattery} onChange={setNewBattery} />
      <button className="btn btn-primary mt-3" onClick={handleAdd}>
        Agregar Batería
      </button>
    </div>
  );
};

export default BatteryView;
