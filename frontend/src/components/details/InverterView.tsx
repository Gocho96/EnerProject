import React, { useState } from "react";
import { toast } from "react-toastify";
import { Inverter, ProjectDetails } from "../../types/projectDetails";
import InverterForm from "./InverterForm";
import {
  addInverter,
  updateInverter,
  deleteInverter,
} from "../../services/ProjectDetailsService";

interface Props {
  projectId: string;
  inverters: Inverter[];
  onUpdate: (updated: Partial<ProjectDetails>) => void;
}

const InverterView: React.FC<Props> = ({ projectId, inverters, onUpdate }) => {
  const [newInverter, setNewInverter] = useState<Inverter>({});
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedInverter, setEditedInverter] = useState<Inverter>({});

  const handleAdd = async () => {
    try {
      const updatedProject = await addInverter(projectId, newInverter);
      onUpdate({ inverters: updatedProject.inverters });
      setNewInverter({});
      toast.success("Inversor agregado");
    } catch (error: any) {
      toast.error(error.message || "Error al agregar inversor");
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditedInverter(inverters[index]);
  };

  const handleUpdate = async (data: Inverter) => {
    const inverterId = (inverters[editingIndex!] as any)._id;
    try {
      const updatedProject = await updateInverter(projectId, inverterId, data);
      onUpdate({ inverters: updatedProject.inverters });
      toast.success("Inversor actualizado");
      setEditingIndex(null);
    } catch (error: any) {
      toast.error(error.message || "Error al actualizar inversor");
    }
  };

  const handleDelete = async (index: number) => {
    const inverterId = (inverters[index] as any)._id;
    try {
      const updatedProject = await deleteInverter(projectId, inverterId);
      onUpdate({ inverters: updatedProject.inverters });
      toast.success("Inversor eliminado");
    } catch (error: any) {
      toast.error(error.message || "Error al eliminar inversor");
    }
  };

  return (
    <div className="card p-4 mt-4">
      <h5 className="mb-3">Inversores</h5>

      {inverters.length === 0 ? (
        <p>No hay inversores registrados.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Potencia</th>
                <th>Marca</th>
                <th>Referencia</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {inverters.map((inverter, idx) => (
                <tr key={idx}>
                  {editingIndex === idx ? (
                    <td colSpan={5}>
                      <InverterForm data={editedInverter} onChange={setEditedInverter} />
                      <div className="mt-2">
                        <button className="btn btn-success me-2" onClick={() => handleUpdate(editedInverter)}>Guardar</button>
                        <button className="btn btn-secondary" onClick={() => setEditingIndex(null)}>Cancelar</button>
                      </div>
                    </td>
                  ) : (
                    <>
                      <td>{inverter.numberInverter ?? "N/A"}</td>
                      <td>{inverter.inverterPower ?? "N/A"} W</td>
                      <td>{inverter.inverterBrand || "N/A"}</td>
                      <td>{inverter.inverterReference || "N/A"}</td>
                      <td>
                        <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(idx)}>Editar</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(idx)}>Eliminar</button>
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
      <h6>Agregar nuevo inversor</h6>
      <InverterForm data={newInverter} onChange={setNewInverter} />
      <button className="btn btn-primary mt-3" onClick={handleAdd}>Agregar Inversor</button>
    </div>
  );
};

export default InverterView;
