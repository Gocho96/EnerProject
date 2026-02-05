import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Shopping, MaterialItem } from "../../../types/phases/sales";
import {
  getShoppingByProjectCode,
  deleteMaterial,
} from "../../../services/ShoppingService";
import ShoppingForm from "./ShoppingForm";
import { formatLocalDate } from "../../../utils/dateUtils";

const ShoppingDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [shopping, setShopping] = useState<Shopping | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<MaterialItem | null>(null);

  const fetchShopping = async () => {
    try {
      if (!code) return;
      const response = await getShoppingByProjectCode(code);
      if (response) {
        setShopping(response.data);
      } else {
        setShopping(null);
      }
    } catch (error: any) {
      console.error("Error al obtener compras:", error);
      toast.error("Error al cargar compras");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShopping();
  }, [code]);

  const handleSuccess = () => {
    setAdding(false);
    setEditingMaterial(null);
    fetchShopping();
  };

  const handleDelete = async (materialId: string) => {
    if (!shopping?._id || !shopping.projectId) return;

    if (window.confirm("¿Estás seguro de eliminar este material?")) {
      try {
        await deleteMaterial(shopping.projectId, materialId);
        toast.success("Material eliminado");
        fetchShopping();
      } catch (error) {
        console.error("Error al eliminar material:", error);
        toast.error("No se pudo eliminar el material");
      }
    }
  };

  if (loading) return <div className="container mt-4">Cargando compras...</div>;

  return (
    <div className="container mt-4">
      <h3>Compras - Proyecto {code}</h3>

      {!adding && !editingMaterial && (
        <button
          className="btn btn-primary my-3"
          onClick={() => setAdding(true)}
        >
          + Agregar material
        </button>
      )}

      {(adding || editingMaterial) && (
        <ShoppingForm
          projectId={shopping?.projectId ?? ""}
          onSuccess={handleSuccess}
          onCancel={() => {
            setAdding(false);
            setEditingMaterial(null);
          }}
          existingMaterial={editingMaterial ?? undefined}
        />
      )}

      {shopping?.materialItem?.length ? (
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
              {shopping.materialItem.map((item) => (
                <tr key={item._id}>
                  <td>{item.materialDescription}</td>
                  <td>{item.materialQuantity}</td>
                  <td>{item.materialSupplier}</td>
                  <td>{item.materialInvoice}</td>
                  <td>{item.materialDate && formatLocalDate(item.materialDate)}</td>
                  <td>${item.materialSubtotal?.toLocaleString() ?? "-"}</td>
                  <td>${item.materialIVA?.toLocaleString() ?? "-"}</td>
                  <td>${item.materialTotal?.toLocaleString() ?? "-"}</td>
                  <td className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => setEditingMaterial(item)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item._id!)}
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
        <p>No hay materiales aún registrados para este proyecto.</p>
      )}

      <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">
        ← Volver
      </button>
    </div>
  );
};

export default ShoppingDetail;
