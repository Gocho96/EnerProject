import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getByProjectCodeBilling } from "../../../services/BillingService";
import { toast } from "react-toastify";
import { Billing } from "../../../types/billing";

const BillingDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [billings, setBillings] = useState<Billing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBillings = async () => {
      try {
        if (!code) return;
        const result = await getByProjectCodeBilling(code);
        if (Array.isArray(result)) {
          setBillings(result);
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

  if (loading) return <div className="container mt-4">Cargando facturación...</div>;

  if (!billings.length)
    return (
      <div className="container mt-4">
        <p>No se encontraron facturas para el proyecto con código <strong>{code}</strong>.</p>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">← Volver</button>
      </div>
    );

  return (
    <div className="container mt-4">
      <h3>Facturación - Proyecto {code}</h3>
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
            </tr>
          </thead>
          <tbody>
            {billings.map((item) => (
              <tr key={item._id}>
                <td>{item.billingNumber}</td>
                <td>{item.billingDate ? new Date(item.billingDate).toLocaleDateString() : "-"}</td>
                <td>{item.billingConcept}</td>
                <td>${item.billingSubtotal?.toLocaleString() ?? "-"}</td>
                <td>${item.billingIva?.toLocaleString() ?? "-"}</td>
                <td>${item.billingTotal?.toLocaleString() ?? "-"}</td>
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

export default BillingDetail;
