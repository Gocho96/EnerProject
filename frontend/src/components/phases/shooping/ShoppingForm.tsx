import React, { useState } from "react";
import { Shopping } from "../../../types/shopping";
import {
  createShoppingByProjectId,
  updateShopping,
} from "../../../services/ShoppingService";
import { toast } from "react-toastify";

interface Props {
  projectId: string;
  initialData?: Shopping;
  onSuccess: () => void;
  onCancel: () => void;
}

const ShoppingForm: React.FC<Props> = ({
  projectId,
  initialData,
  onSuccess,
  onCancel,
}) => {
  const [form, setForm] = useState<Partial<Shopping>>({
    materialDescription: initialData?.materialDescription ?? "",
    materialQuantity: initialData?.materialQuantity ?? 0,
    materialSupplier: initialData?.materialSupplier ?? "",
    materialInvoice: initialData?.materialInvoice ?? "",
    materialDate: initialData?.materialDate?.split("T")[0] ?? "",
    materialSubtotal: initialData?.materialSubtotal ?? 0,
    materialIVA: initialData?.materialIVA ?? 0,
    materialTotal: initialData?.materialTotal ?? 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const numericFields = [
      "materialQuantity",
      "materialSubtotal",
      "materialIVA",
      "materialTotal",
    ];

    setForm((prev) => ({
      ...prev,
      [name]: numericFields.includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        projectId,
      };

      if (initialData) {
        await updateShopping(initialData._id, payload);
        toast.success("Compra actualizada correctamente");
      } else {
        await createShoppingByProjectId(projectId, payload);
        toast.success("Compra agregada correctamente");
      }

      onSuccess();
    } catch (error: any) {
      console.error("Error al guardar la compra:", error);
      toast.error("Error al guardar la compra");
    }
  };

  return (
    <div className="card card-body mb-3">
      <h5>{initialData ? "Editar Compra" : "Nueva Compra"}</h5>
      <div className="row">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            name="materialDescription"
            value={form.materialDescription}
            onChange={handleChange}
            placeholder="Descripción del material"
            className="form-control"
          />
        </div>

        <div className="col-md-2 mb-2">
          <input
            type="number"
            name="materialQuantity"
            value={form.materialQuantity}
            onChange={handleChange}
            placeholder="Cantidad"
            className="form-control"
          />
        </div>

        <div className="col-md-3 mb-2">
          <input
            type="text"
            name="materialSupplier"
            value={form.materialSupplier}
            onChange={handleChange}
            placeholder="Proveedor"
            className="form-control"
          />
        </div>

        <div className="col-md-3 mb-2">
          <input
            type="text"
            name="materialInvoice"
            value={form.materialInvoice}
            onChange={handleChange}
            placeholder="Factura"
            className="form-control"
          />
        </div>

        <div className="col-md-3 mb-2">
          <input
            type="date"
            name="materialDate"
            value={form.materialDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="col-md-3 mb-2">
          <input
            type="number"
            name="materialSubtotal"
            value={form.materialSubtotal}
            onChange={handleChange}
            placeholder="Subtotal"
            className="form-control"
          />
        </div>

        <div className="col-md-3 mb-2">
          <input
            type="number"
            name="materialIVA"
            value={form.materialIVA}
            onChange={handleChange}
            placeholder="IVA"
            className="form-control"
          />
        </div>

        <div className="col-md-3 mb-2">
          <input
            type="number"
            name="materialTotal"
            value={form.materialTotal}
            onChange={handleChange}
            placeholder="Total"
            className="form-control"
          />
        </div>
      </div>

      <div className="mt-2 d-flex gap-2">
        <button onClick={handleSubmit} className="btn btn-success">
          Guardar
        </button>
        <button onClick={onCancel} className="btn btn-secondary">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ShoppingForm;
