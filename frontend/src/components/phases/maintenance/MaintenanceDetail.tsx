import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMaintenancesByProjectCode,
  updateMaintenanceFrequency,
  addMaintenanceEntry,
  updateMaintenance,
  deleteMaintenance,
} from "../../../services/MaintenanceService";
import { Maintenance, MaintenanceRecord } from "../../../types/maintenance";
import { toast } from "react-toastify";

const MaintenanceDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [maintenance, setMaintenance] = useState<Maintenance | null>(null);
  const [frequency, setFrequency] = useState<number>(0);
  const [nextMaintenance, setNextMaintenance] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<MaintenanceRecord | null>(null);
  const [formData, setFormData] = useState<Partial<MaintenanceRecord>>({});

  useEffect(() => {
    if (code) fetchMaintenance();
  }, [code]);

  const fetchMaintenance = async () => {
    try {
      const data = await getMaintenancesByProjectCode(code!);
      setMaintenance(data);
      setFrequency(data.maintenanceFrequency);
      setNextMaintenance(data.nextMaintenance?.substring(0, 10) || "");
    } catch (err) {
      toast.error("Error al cargar datos de mantenimiento.");
    }
  };

  const handleSaveFrequency = async () => {
    try {
      await updateMaintenanceFrequency(maintenance!.projectId, {
        maintenanceFrequency: frequency,
        nextMaintenance,
      });
      toast.success("Frecuencia actualizada");
      fetchMaintenance();
    } catch {
      toast.error("Error al actualizar frecuencia.");
    }
  };

  const handleChangeForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (!maintenance) return;
      if (editingEntry) {
        await updateMaintenance(maintenance.projectId, editingEntry._id, formData);
        toast.success("Mantenimiento actualizado");
      } else {
        await addMaintenanceEntry(maintenance.projectId, formData);
        toast.success("Mantenimiento agregado");
      }
      setShowForm(false);
      setEditingEntry(null);
      setFormData({});
      fetchMaintenance();
    } catch {
      toast.error("Error al guardar mantenimiento.");
    }
  };

  const handleEdit = (entry: MaintenanceRecord) => {
    setFormData({
      ...entry,
      maintenanceDate: entry.maintenanceDate?.substring(0, 10),
      maintenanceReportDate: entry.maintenanceReportDate?.substring(0, 10),
      maintenanceInvoiceDate: entry.maintenanceInvoiceDate?.substring(0, 10),
    });
    setEditingEntry(entry);
    setShowForm(true);
  };

  const handleDelete = async (entry: MaintenanceRecord) => {
    if (!maintenance) return;
    if (!window.confirm("¿Eliminar mantenimiento?")) return;
    try {
      await deleteMaintenance(maintenance.projectId, entry._id);
      toast.success("Mantenimiento eliminado");
      fetchMaintenance();
    } catch {
      toast.error("Error al eliminar.");
    }
  };

  return (
    <div className="container">
      <h4>Mantenimientos - Proyecto {code}</h4>

      <div className="mb-3">
        <label>Frecuencia (meses)</label>
        <input
          type="number"
          className="form-control"
          value={frequency}
          onChange={(e) => setFrequency(Number(e.target.value))}
        />
      </div>
      <div className="mb-3">
        <label>Próximo mantenimiento</label>
        <input
          type="date"
          className="form-control"
          value={nextMaintenance}
          onChange={(e) => setNextMaintenance(e.target.value)}
        />
      </div>
      <button className="btn btn-success mb-3" onClick={handleSaveFrequency}>
        Guardar cambios
      </button>

      <hr />

      <button
        className="btn btn-outline-primary mb-3"
        onClick={() => {
          setShowForm(!showForm);
          setFormData({});
          setEditingEntry(null);
        }}
      >
        {editingEntry ? "Cancelar edición" : showForm ? "Ocultar formulario" : "Agregar mantenimiento"}
      </button>

      {showForm && (
        <div className="card p-3 mb-3">
          <div className="mb-2">
            <label>Fecha</label>
            <input
              type="date"
              className="form-control"
              name="maintenanceDate"
              value={formData.maintenanceDate || ""}
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-2">
            <label>Tipo</label>
            <select
              className="form-control"
              name="typeMaintenance"
              value={formData.typeMaintenance || ""}
              onChange={handleChangeForm}
            >
              <option value="">Seleccione</option>
              <option value="Preventivo">Preventivo</option>
              <option value="Correctivo">Correctivo</option>
            </select>
          </div>
          <div className="mb-2">
            <label>Fecha Informe</label>
            <input
              type="date"
              className="form-control"
              name="maintenanceReportDate"
              value={formData.maintenanceReportDate || ""}
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-2">
            <label>Fecha Factura</label>
            <input
              type="date"
              className="form-control"
              name="maintenanceInvoiceDate"
              value={formData.maintenanceInvoiceDate || ""}
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-2">
            <label>Notas</label>
            <textarea
              className="form-control"
              name="maintenanceNotes"
              value={formData.maintenanceNotes || ""}
              onChange={handleChangeForm}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {editingEntry ? "Actualizar" : "Agregar"}
          </button>
        </div>
      )}

      <h5>Historial de Mantenimientos</h5>
      {maintenance?.maintenance?.map((entry) => (
        <div key={entry._id} className="card p-3 mb-2">
          <strong>Mantenimiento #{entry.maintenanceNumber}</strong>
          <p><strong>Tipo:</strong> {entry.typeMaintenance}</p>
          <p><strong>Fecha:</strong> {entry.maintenanceDate?.substring(0, 10)}</p>
          <p><strong>Fecha Informe:</strong> {entry.maintenanceReportDate?.substring(0, 10)}</p>
          <p><strong>Fecha Factura:</strong> {entry.maintenanceInvoiceDate?.substring(0, 10)}</p>
          <p><strong>Notas:</strong> {entry.maintenanceNotes}</p>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-outline-secondary" onClick={() => handleEdit(entry)}>Editar</button>
            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(entry)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MaintenanceDetail;
