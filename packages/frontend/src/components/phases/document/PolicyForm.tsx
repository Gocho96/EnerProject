import React, { useState, useEffect } from "react";
import { PolicyType, Policy } from "../../../types/phases/document";
import { addPolicy } from "../../../services/DocumentService";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL } from "../../../config/api";

interface Props {
  documentalId: string;
  contractId: string;
  onPolicyAdded: () => void;
  existingPolicy?: Policy;
  onCancel?: () => void;
}

const POLICY_TYPES: PolicyType[] = [
  "Cumplimiento",
  "Estabilidad y calidad",
  "Buen manejo del anticipo",
  "Prestaciones sociales",
  "Responsabilidad civil",
  "Montaje",
];

const PolicyForm: React.FC<Props> = ({
  documentalId,
  contractId,
  onPolicyAdded,
  existingPolicy,
  onCancel,
}) => {
  const [form, setForm] = useState<Partial<Policy>>({
    policyType: "Cumplimiento",
    policyNumber: "",
    policyValue: undefined,
    policyDate: "",
    policyExpiration: "",
    policyIssuer: "",
  });

  useEffect(() => {
    if (existingPolicy) {
      setForm(existingPolicy);
    }
  }, [existingPolicy]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "policyValue" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (existingPolicy) {
        await axios.put(
          `${API_URL}/documental/${documentalId}/contract/${contractId}/policy/${existingPolicy._id}`,
          form
        );
        toast.success("Póliza actualizada correctamente");
      } else {
        await addPolicy(documentalId, contractId, form as Policy);
        toast.success("Póliza agregada correctamente");
      }
      onPolicyAdded();
    } catch (error: any) {
      const backendErrors =
        error?.response?.data?.error || error?.response?.data?.message;

      if (Array.isArray(backendErrors)) {
        backendErrors.forEach((err: string) => toast.error(err));
      } else {
        toast.error(backendErrors || "Error al guardar la póliza");
      }
      console.error("Error al guardar la póliza:", error);
    }
  };

  return (
    <div className="border p-3 mt-3 rounded bg-light">
      <h6>{existingPolicy ? "Editar póliza" : "Nueva póliza"}</h6>
      <p className="text-center">
        Los campos marcados con (*) son obligatorios.
      </p>
      <select
        className="form-control mb-2"
        name="policyType"
        value={form.policyType}
        onChange={handleChange}
      >
        {POLICY_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <input
        className="form-control mb-2"
        name="policyNumber"
        placeholder="Número de póliza *"
        value={form.policyNumber}
        onChange={handleChange}
      />
      <input
        type="number"
        className="form-control mb-2"
        name="policyValue"
        placeholder="Valor de la póliza *"
        value={form.policyValue}
        onChange={handleChange}
      />
      <label className="form-label">Fecha de emisión *</label>
      <input
        type="date"
        className="form-control mb-2"
        name="policyDate"
        value={form.policyDate?.slice(0, 10)}
        onChange={handleChange}
      />
      <label className="form-label">Fecha de vencimiento *</label>
      <input
        type="date"
        className="form-control mb-2"
        name="policyExpiration"
        value={form.policyExpiration?.slice(0, 10)}
        onChange={handleChange}
      />
      <input
        className="form-control mb-2"
        name="policyIssuer"
        placeholder="Entidad aseguradora *"
        value={form.policyIssuer}
        onChange={handleChange}
      />

      <div className="d-flex justify-content-between">
        <button className="btn btn-success" onClick={handleSubmit}>
          {existingPolicy ? "Guardar cambios" : "Guardar póliza"}
        </button>
        {onCancel && (
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
};

export default PolicyForm;
