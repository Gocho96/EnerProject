import React, { useState } from "react";
import { toast } from "react-toastify";
import { SolarPanel, ProjectDetails } from "../../types/projectDetails";
import SolarPanelForm from "./SolarPanelForm";
import {
  addSolarPanel,
  updateSolarPanel,
  deleteSolarPanel,
} from "../../services/ProjectDetailsService";

interface Props {
  projectId: string;
  panels: SolarPanel[];
  onUpdate: (updated: Partial<ProjectDetails>) => void;
}

const SolarPanelView: React.FC<Props> = ({ projectId, panels, onUpdate }) => {
  const [newPanel, setNewPanel] = useState<SolarPanel>({});
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedPanel, setEditedPanel] = useState<SolarPanel>({});

  const handleAdd = async () => {
    try {
      const updatedProject = await addSolarPanel(projectId, newPanel);
      onUpdate({ solarPanels: updatedProject.solarPanels });
      setNewPanel({});
      toast.success("Panel solar agregado");
    } catch (error: any) {
      toast.error(error.message || "Error al agregar panel solar");
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditedPanel(panels[index]);
  };

  const handleUpdate = async (data: SolarPanel) => {
    const panelId = (panels[editingIndex!] as any)._id;
    try {
      const updatedProject = await updateSolarPanel(projectId, panelId, data);
      onUpdate({ solarPanels: updatedProject.solarPanels });
      toast.success("Panel actualizado");
      setEditingIndex(null);
    } catch (error: any) {
      toast.error(error.message || "Error al actualizar panel");
    }
  };

  const handleDelete = async (index: number) => {
    const panelId = (panels[index] as any)._id;
    try {
      const updatedProject = await deleteSolarPanel(projectId, panelId);
      onUpdate({ solarPanels: updatedProject.solarPanels });
      toast.success("Panel eliminado");
    } catch (error: any) {
      toast.error(error.message || "Error al eliminar panel");
    }
  };

  return (
    <div className="card p-4 mt-4">
      <h5 className="mb-3">Paneles Solares</h5>

      {panels.length === 0 ? (
        <p>No hay paneles solares registrados.</p>
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
              {panels.map((panel, idx) => (
                <tr key={idx}>
                  {editingIndex === idx ? (
                    <td colSpan={5}>
                      <SolarPanelForm data={editedPanel} onChange={setEditedPanel} />
                      <div className="mt-2">
                        <button className="btn btn-success me-2" onClick={() => handleUpdate(editedPanel)}>Guardar</button>
                        <button className="btn btn-secondary" onClick={() => setEditingIndex(null)}>Cancelar</button>
                      </div>
                    </td>
                  ) : (
                    <>
                      <td>{panel.numberPanels ?? "N/A"}</td>
                      <td>{panel.panelPower ?? "N/A"} W</td>
                      <td>{panel.panelBrand || "N/A"}</td>
                      <td>{panel.panelReference || "N/A"}</td>
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
      <h6>Agregar nuevo panel</h6>
      <SolarPanelForm data={newPanel} onChange={setNewPanel} />
      <button className="btn btn-primary mt-3" onClick={handleAdd}>Agregar Panel</button>
    </div>
  );
};

export default SolarPanelView;
