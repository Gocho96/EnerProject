import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getRetieByProjectCode } from "../services/RetieService";
import { Retie } from "../types/retie";

const RetieDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [retie, setRetie] = useState<Retie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRetie = async () => {
      try {
        if (!code) return;
        const response = await getRetieByProjectCode(code);
        setRetie(response.data);
      } catch (error: any) {
        console.error("Error al obtener información RETIE:", error);
        toast.error(
          error?.response?.data?.message || "No se encontró información RETIE"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRetie();
  }, [code]);

  const renderDate = (date?: string | null) =>
    date ? new Date(date).toLocaleDateString() : "Sin fecha";

  if (loading) return <div className="container mt-4">Cargando...</div>;

  if (!retie)
    return (
      <div className="container mt-4">
        <p>No se encontró información RETIE para el proyecto <strong>{code}</strong>.</p>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">← Volver</button>
      </div>
    );

  return (
    <div className="container mt-4">
      <h3>Fase RETIE - Proyecto {code}</h3>
      <ul className="list-group">
        <li className="list-group-item">
          <strong>Fecha de solicitud:</strong> {renderDate(retie.applicationDateRetie)}
        </li>
        <li className="list-group-item">
          <strong>Número de oferta comercial:</strong> {retie.commercialOfferNumberRetie ?? "No registrado"}
        </li>
        <li className="list-group-item">
          <strong>Proveedor:</strong> {retie.supplierRetie || "No registrado"}
        </li>
        <li className="list-group-item">
          <strong>Fecha de pago:</strong> {renderDate(retie.paymentDateRetie)}
        </li>
        <li className="list-group-item">
          <strong>Fecha de inspección:</strong> {renderDate(retie.inspectionDateRetie)}
        </li>
        <li className="list-group-item">
          <strong>Fecha de dictamen:</strong> {renderDate(retie.dictamenDateRetie)}
        </li>
        <li className="list-group-item">
          <strong>Número de dictamen:</strong> {retie.dictamenNumberRetie ?? "No registrado"}
        </li>
      </ul>
      <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">
        ← Volver
      </button>
    </div>
  );
};

export default RetieDetail;
