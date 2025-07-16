import React, { useEffect, useState } from "react";
import { Contract } from "../../../types/documental";
import { addContract, updateContract } from "../../../services/DocumentalService";
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
    contractValue: 0,
    contractExpiration: "",
  });

  useEffect(() => {
    if (existingContract) setForm(existingContract);
  }, [existingContract]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "contractValue" ? Number(value) : value }));
  };

  const handleSubmit = async () => {
    try {
      if (existingContract) {
        await updateContract(documentalId, existingContract._id, form as Contract);
        toast.success("Contrato actualizado correctamente");
      } else {
        await addContract(documentalId, { ...form, policies: [] } as Contract);
        toast.success("Contrato agregado correctamente");
      }
      onContractAdded();
    } catch (err) {
      toast.error("Error al guardar contrato");
      console.error(err);
    }
  };

  return (
    <div className="border p-3 rounded mb-3 bg-light">
      <h5>{existingContract ? "Editar contrato" : "Nuevo contrato"}</h5>
      <input
        name="contractNumber"
        className="form-control mb-2"
        placeholder="Número de contrato"
        value={form.contractNumber}
        onChange={handleChange}
      />
      <input
        type="date"
        name="contractDate"
        className="form-control mb-2"
        value={form.contractDate?.slice(0, 10) || ""}
        onChange={handleChange}
      />
      <input
        type="number"
        name="contractValue"
        className="form-control mb-2"
        placeholder="Valor"
        value={form.contractValue}
        onChange={handleChange}
      />
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