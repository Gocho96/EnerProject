import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Shopping } from "../../../types/shopping";
import {
  getShoppingsByProjectCode,
  deleteShopping,
} from "../../../services/ShoppingService";
import ShoppingForm from "./ShoppingForm";

const ShoppingDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [shoppings, setShoppings] = useState<Shopping[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<Shopping | null>(null);

  const fetchShoppings = async () => {
    try {
      if (!code) return;
      const response = await getShoppingsByProjectCode(code);
      if (response?.data) {
        setShoppings(response.data);
      } else {
        toast.warn("No se encontraron compras para este proyecto");
      }
    } catch (error: any) {
      console.error("Error al obtener compras:", error);
      toast.error(error.response?.data?.message || "Error al cargar compras");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("¿Deseas eliminar esta compra?");
    if (!confirm) return;

    try {
      await deleteShopping(id);
      toast.success("Compra eliminada");
      fetchShoppings();
    } catch (error) {
      toast.error("Error al eliminar la compra");
    }
  };

  const handleSuccess = () => {
    setAdding(false);
    setEditing(null);
    fetchShoppings();
  };

  useEffect(() => {
    fetchShoppings();
  }, [code]);

  if (loading) return <div className="container mt-4">Cargando compras...</div>;

  return (
    <div className="container mt-4">
      <h3>Compras - Proyecto {code}</h3>

      {/* Botón agregar compra */}
      {!adding && !editing && (
        <button
          className="btn btn-primary my-3"
          onClick={() => setAdding(true)}
        >
          + Agregar compra
        </button>
      )}

      {/* Formulario de nueva compra */}
      {adding && shoppings[0]?.projectId && (
        <ShoppingForm
          projectId={shoppings[0].projectId}
          onSuccess={handleSuccess}
          onCancel={() => setAdding(false)}
        />
      )}

      {/* Formulario de edición */}
      {editing && (
        <ShoppingForm
          projectId={editing.projectId}
          initialData={editing}
          onSuccess={handleSuccess}
          onCancel={() => setEditing(null)}
        />
      )}

      {/* Tabla de compras */}
      {!adding && !editing && (
        <>
          {shoppings.length ? (
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Descripción</th>
                    <th>Cantidad</th>
                    <th>Proveedor</th>
                    <th>Factura</th>
                    <th>Fecha</th>
                    <th>Subtotal</th>
                    <th>IVA</th>
                    <th>Total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {shoppings.map((item) => (
                    <tr key={item._id}>
                      <td>{item.materialDescription || "-"}</td>
                      <td>{item.materialQuantity ?? "-"}</td>
                      <td>{item.materialSupplier || "-"}</td>
                      <td>{item.materialInvoice || "-"}</td>
                      <td>
                        {item.materialDate
                          ? new Date(item.materialDate).toLocaleDateString()
                          : "-"}
                      </td>
                      <td>${item.materialSubtotal?.toLocaleString() ?? "-"}</td>
                      <td>${item.materialIVA?.toLocaleString() ?? "-"}</td>
                      <td>${item.materialTotal?.toLocaleString() ?? "-"}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => setEditing(item)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(item._id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No se encontraron compras para el proyecto con código <strong>{code}</strong>.</p>
          )}
        </>
      )}

      <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">
        ← Volver
      </button>
    </div>
  );
};

export default ShoppingDetail;
