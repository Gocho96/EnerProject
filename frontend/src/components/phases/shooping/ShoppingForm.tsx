import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  addMaterialToShopping,
  createShopping,
  updateMaterial
} from "../../../services/ShoppingService";
import { MaterialItem } from "../../../types/shopping";

interface Props {
  shoppingId?: string;
  projectId: string;
  onSuccess: () => void;
  onCancel: () => void;
  existingMaterial?: MaterialItem;
}

const ShoppingForm: React.FC<Props> = ({
  projectId,
  onSuccess,
  onCancel,
  existingMaterial
}) => {
  const [form, setForm] = useState<Omit<MaterialItem, "_id" | "materialTotal">>({
    materialDescription: "",
    materialQuantity: undefined,
    materialSupplier: "",
    materialInvoice: "",
    materialDate: "",
    materialSubtotal: undefined,
    materialIVA: undefined,
  });

  useEffect(() => {
    if (existingMaterial) {
      const { _id, materialTotal, ...rest } = existingMaterial;
      setForm(rest);
    }
  }, [existingMaterial]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericFields = [
      "materialQuantity",
      "materialSubtotal",
      "materialIVA",
    ];
    setForm((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };


const handleSubmit = async () => {
  try {
    if (existingMaterial && existingMaterial._id) {
      await updateMaterial(projectId, existingMaterial._id, form);
      toast.success("Material actualizado correctamente");
    } else {
      const existing = await addMaterialToShopping(projectId, form);
      if (!existing.data) {
        await createShopping({ projectId, ...form });
      }
      toast.success("Material guardado correctamente");
    }

    onSuccess();
  } catch (error: any) {
    console.error("Error al guardar material:", error);

    const backendMessage =
      error?.response?.data?.message || error?.response?.data?.error;

    const backendErrors = error?.response?.data?.errors;

    if (backendMessage) {
      toast.error(backendMessage);
    } else if (Array.isArray(backendErrors)) {
      backendErrors.forEach((err: string) => toast.error(err));
    } else {
      toast.error("Error al guardar material");
    }
  }
};

  return (
    <div className="card card-body mb-3">
      <h5>Agregar material</h5>
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
            value={form.materialQuantity ?? ""}
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
            value={form.materialSubtotal ?? ""}
            onChange={handleChange}
            placeholder="Subtotal"
            className="form-control"
          />
        </div>

        <div className="col-md-3 mb-2">
          <input
            type="number"
            name="materialIVA"
            value={form.materialIVA ?? ""}
            onChange={handleChange}
            placeholder="IVA"
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
