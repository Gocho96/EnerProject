import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getByProjectCodeBilling,
  createBillingByProject,
  updateBilling,
  deleteBilling,
} from "../../../services/BillingService";
import { Billing } from "../../../types/phases/purchases";
import BillingForm from "./BillingForm";

const BillingDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [billings, setBillings] = useState<Billing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBilling, setEditingBilling] = useState<Billing | null>(null);
  const [projectId, setProjectId] = useState<string>("");

  useEffect(() => {
    const fetchBillings = async () => {
      try {
        if (!code) return;
        const result = await getByProjectCodeBilling(code);
        if (Array.isArray(result)) {
          setBillings(result);
          if (result.length > 0) {
            setProjectId(result[0].projectId);
          }
        } else {
          toast.warn("No se encontraron facturas para este proyecto");
        }
      } catch (error: any) {
        console.error("Error al obtener facturación:", error);
        toast.error(error.response?.data?.message || "Error al cargar facturación");
      } finally {
        setLoading(false);
      }
    };

    fetchBillings();
  }, [code]);

  const handleAdd = async (data: any) => {
    try {
      const newBilling = await createBillingByProject(projectId, data);
      setBillings([...billings, newBilling]);
      toast.success("Factura agregada correctamente");
      setShowForm(false);
    } catch (error) {
      toast.error("Error al crear factura");
    }
  };

  const handleUpdate = async (data: any) => {
    try {
      const updated = await updateBilling(editingBilling!._id, data);
      setBillings((prev) =>
        prev.map((b) => (b._id === updated._id ? updated : b))
      );
      toast.success("Factura actualizada");
      setEditingBilling(null);
      setShowForm(false);
    } catch (error) {
      toast.error("Error al actualizar la factura");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta factura?")) return;
    try {
      await deleteBilling(id);
      setBillings((prev) => prev.filter((b) => b._id !== id));
      toast.success("Factura eliminada");
    } catch (error) {
      toast.error("Error al eliminar la factura");
    }
  };

  if (loading) return <div className="container mt-4">Cargando facturación...</div>;

  return (
    <div className="container mt-4">
      <h3>Facturación - Proyecto {code}</h3>

      {!showForm ? (
        <button
          className="btn btn-primary mb-3"
          onClick={() => {
            setEditingBilling(null);
            setShowForm(true);
          }}
        >
          + Agregar factura
        </button>
      ) : (
        <BillingForm
          onSubmit={editingBilling ? handleUpdate : handleAdd}
          initialData={editingBilling || { projectId }}
          onCancel={() => {
            setEditingBilling(null);
            setShowForm(false);
          }}
        />
      )}

      {billings.length === 0 ? (
        <p>No se encontraron facturas para el proyecto con código <strong>{code}</strong>.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>N° Factura</th>
                <th>Fecha</th>
                <th>Concepto</th>
                <th>Subtotal</th>
                <th>IVA</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {billings.map((item) => (
                <tr key={item._id}>
                  <td>{item.billingNumber}</td>
                  <td>
                    {item.billingDate
                      ? new Date(item.billingDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>{item.billingConcept}</td>
                  <td>${item.billingSubtotal?.toLocaleString() ?? "-"}</td>
                  <td>${item.billingIva?.toLocaleString() ?? "-"}</td>
                  <td>${item.billingTotal?.toLocaleString() ?? "-"}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => {
                          setEditingBilling(item);
                          setShowForm(true);
                        }}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(item._id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">
        ← Volver
      </button>
    </div>
  );
};

export default BillingDetail;
