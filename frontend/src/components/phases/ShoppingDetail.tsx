import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Shopping } from "../../types/shopping";
import { getShoppingsByProjectCode } from "../../services/ShoppingService";

const ShoppingDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [shoppings, setShoppings] = useState<Shopping[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchShoppings();
  }, [code]);

  if (loading) return <div className="container mt-4">Cargando compras...</div>;

  if (!shoppings.length)
    return (
      <div className="container mt-4">
        <p>No se encontraron compras para el proyecto con código <strong>{code}</strong>.</p>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">← Volver</button>
      </div>
    );

  return (
    <div className="container mt-4">
      <h3>Compras - Proyecto {code}</h3>
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
            </tr>
          </thead>
          <tbody>
            {shoppings.map((item) => (
              <tr key={item._id}>
                <td>{item.materialDescription || "-"}</td>
                <td>{item.materialQuantity ?? "-"}</td>
                <td>{item.materialSupplier || "-"}</td>
                <td>{item.materialInvoice || "-"}</td>
                <td>{item.materialDate ? new Date(item.materialDate).toLocaleDateString() : "-"}</td>
                <td>${item.materialSubtotal?.toLocaleString() ?? "-"}</td>
                <td>${item.materialIVA?.toLocaleString() ?? "-"}</td>
                <td>${item.materialTotal?.toLocaleString() ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">
        ← Volver
      </button>
    </div>
  );
};

export default ShoppingDetail;
