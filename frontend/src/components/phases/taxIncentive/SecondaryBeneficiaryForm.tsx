import React, { useEffect, useState } from "react";
import { SecondaryBeneficiary } from "../../../types/taxIncentive";

interface Props {
  beneficiary?: SecondaryBeneficiary;
  onSubmit: (data: SecondaryBeneficiary) => void;
  onCancel?: () => void;
  submitText?: string;
}

const SecondaryBeneficiaryForm: React.FC<Props> = ({
  beneficiary,
  onSubmit,
  onCancel,
  submitText = "Guardar",
}) => {
  const [form, setForm] = useState<SecondaryBeneficiary>({
    name: "",
    numberDocument: "",
  });

  useEffect(() => {
    if (beneficiary) setForm(beneficiary);
  }, [beneficiary]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.numberDocument) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="mb-2">
        <label className="form-label">Nombre</label>
        <input
          name="name"
          className="form-control"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Número de Documento</label>
        <input
          name="numberDocument"
          className="form-control"
          value={form.numberDocument}
          onChange={handleChange}
          required
        />
      </div>
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary btn-sm">
          {submitText}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary btn-sm" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default SecondaryBeneficiaryForm;
