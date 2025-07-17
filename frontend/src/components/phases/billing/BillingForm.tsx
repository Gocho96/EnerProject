import React, { useState } from "react";
import { Billing } from "../../../types/billing";

interface BillingFormProps {
  onSubmit: (data: Omit<Billing, "_id" | "createdAt" | "updatedAt">) => void;
  initialData?: Partial<Billing>;
  onCancel?: () => void;
}

const BillingForm: React.FC<BillingFormProps> = ({ onSubmit, initialData = {}, onCancel }) => {
  const [billingNumber, setBillingNumber] = useState(initialData.billingNumber || "");
  const [billingDate, setBillingDate] = useState(initialData.billingDate?.substring(0, 10) || "");
  const [billingConcept, setBillingConcept] = useState(initialData.billingConcept || "");
  const [billingSubtotal, setBillingSubtotal] = useState(initialData.billingSubtotal || 0);
  const [billingIva, setBillingIva] = useState(initialData.billingIva || 0);

  const billingTotal = billingSubtotal + billingIva;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      projectId: initialData.projectId || "",
      billingNumber,
      billingDate,
      billingConcept,
      billingSubtotal,
      billingIva,
      billingTotal,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-3">
      <div className="mb-2">
        <label className="form-label">Número de Factura</label>
        <input
          type="text"
          className="form-control"
          value={billingNumber}
          onChange={(e) => setBillingNumber(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Fecha</label>
        <input
          type="date"
          className="form-control"
          value={billingDate}
          onChange={(e) => setBillingDate(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Concepto</label>
        <input
          type="text"
          className="form-control"
          value={billingConcept}
          onChange={(e) => setBillingConcept(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Subtotal</label>
        <input
          type="number"
          className="form-control"
          value={billingSubtotal}
          onChange={(e) => setBillingSubtotal(parseFloat(e.target.value))}
          min={0}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">IVA</label>
        <input
          type="number"
          className="form-control"
          value={billingIva}
          onChange={(e) => setBillingIva(parseFloat(e.target.value))}
          min={0}
        />
      </div>

      <div className="mb-2">
        <strong>Total: ${billingTotal.toLocaleString()}</strong>
      </div>

      <div className="d-flex gap-2 mt-2">
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default BillingForm;
