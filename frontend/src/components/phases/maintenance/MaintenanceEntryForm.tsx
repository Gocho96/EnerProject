import React, { useState } from "react";
import { addMaintenanceEntry } from "../../../services/MaintenanceService";
import { toast } from "react-toastify";

interface Props {
  projectId: string;
  onEntryAdded: () => void;
}

const MaintenanceEntryForm: React.FC<Props> = ({ projectId, onEntryAdded }) => {
  const [form, setForm] = useState({
    maintenanceDate: "",
    typeMaintenance: "Preventivo",
    maintenanceReportDate: "",
    maintenanceInvoiceDate: "",
    maintenanceNotes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addMaintenanceEntry(projectId, form);
      toast.success("Mantenimiento agregado correctamente");
      setForm({
        maintenanceDate: "",
        typeMaintenance: "Preventivo",
        maintenanceReportDate: "",
        maintenanceInvoiceDate: "",
        maintenanceNotes: "",
      });
      onEntryAdded();
    } catch (error: any) {
      toast.error(error.message || "Error al agregar mantenimiento");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 border p-3 rounded">
      <h5>Agregar mantenimiento</h5>
      <div className="mb-2">
        <label className="form-label">Fecha</label>
        <input type="date" name="maintenanceDate" value={form.maintenanceDate} onChange={handleChange} className="form-control" />
      </div>
      <div className="mb-2">
        <label className="form-label">Tipo</label>
        <select name="typeMaintenance" value={form.typeMaintenance} onChange={handleChange} className="form-select">
          <option value="Preventivo">Preventivo</option>
          <option value="Correctivo">Correctivo</option>
        </select>
      </div>
      <div className="mb-2">
        <label className="form-label">Fecha Informe</label>
        <input type="date" name="maintenanceReportDate" value={form.maintenanceReportDate} onChange={handleChange} className="form-control" />
      </div>
      <div className="mb-2">
        <label className="form-label">Fecha Factura</label>
        <input type="date" name="maintenanceInvoiceDate" value={form.maintenanceInvoiceDate} onChange={handleChange} className="form-control" />
      </div>
      <div className="mb-2">
        <label className="form-label">Notas</label>
        <textarea name="maintenanceNotes" value={form.maintenanceNotes} onChange={handleChange} className="form-control" rows={2} />
      </div>
      <button type="submit" className="btn btn-primary">Agregar</button>
    </form>
  );
};

export default MaintenanceEntryForm;
