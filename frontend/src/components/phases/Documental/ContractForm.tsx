import React, { useEffect, useState } from "react";
import { Contract } from "../../../types/documental";
import {
  addContract,
  updateContract,
} from "../../../services/DocumentalService";
import { toast } from "react-toastify";

interface Props {
  documentalId: string;
  onContractAdded: () => void;
  existingContract?: Contract;
  onCancel?: () => void;
}

const ContractForm: React.FC<Props> = ({
  documentalId,
  onContractAdded,
  existingContract,
  onCancel,
}) => {
  const [form, setForm] = useState<Partial<Contract>>({
    contractNumber: "",
    contractDate: "",
    contractValue: undefined,
    contractExpiration: "",
  });

  useEffect(() => {
    if (existingContract) setForm(existingContract);
  }, [existingContract]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "contractValue" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
  try {
    if (existingContract) {
      await updateContract(
        documentalId,
        existingContract._id,
        form as Contract
      );
      toast.success("Contrato actualizado correctamente");
    } else {
      await addContract(documentalId, { ...form, policies: [] } as Contract);
      toast.success("Contrato agregado correctamente");
    }
    onContractAdded();
  } catch (error: any) {
    const backendErrors = error?.response?.data?.error || error?.response?.data?.message;

    if (Array.isArray(backendErrors)) {
      backendErrors.forEach((err: string) => toast.error(err));
    } else {
      toast.error(backendErrors || "Error al guardar contrato");
    }
    console.error("Error al guardar contrato:", error);
  }
};

  return (
    <div className="border p-3 rounded mb-3 bg-light">
      <h5>{existingContract ? "Editar contrato" : "Nuevo contrato"}</h5>
      <p className="text-center">
        Los campos marcados con (*) son obligatorios.
      </p>
      <input
        name="contractNumber"
        className="form-control mb-2"
        placeholder="Número de contrato *"
        value={form.contractNumber}
        onChange={handleChange}
        disabled={!!existingContract}
      />
      <input
        type="number"
        name="contractValue"
        className="form-control mb-2"
        placeholder="Valor del contrato *"
        value={form.contractValue}
        onChange={handleChange}
      />
      <label className="form-label">Fecha de firma del contrato: *</label>
      <input
        type="date"
        name="contractDate"
        className="form-control mb-2"
        value={form.contractDate?.slice(0, 10) || ""}
        onChange={handleChange}
      />
      <label className="form-label">Fecha de vencimiento del contrato: *</label>
      <input
        type="date"
        name="contractExpiration"
        className="form-control mb-2"
        value={form.contractExpiration?.slice(0, 10) || ""}
        onChange={handleChange}
      />
      <div className="d-flex justify-content-between">
        <button className="btn btn-success" onClick={handleSubmit}>
          {existingContract ? "Guardar cambios" : "Guardar contrato"}
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

export default ContractForm;
