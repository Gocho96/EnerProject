import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TaxIncentive } from "../types/taxIncentive";
import { getTaxIncentiveByProjectCode } from "../services/TaxIncentiveService";

const TaxIncentiveDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [taxIncentive, setTaxIncentive] = useState<TaxIncentive | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!code) return;
        const response = await getTaxIncentiveByProjectCode(code);
        setTaxIncentive(response.data);
      } catch (error: any) {
        console.error("Error al obtener incentivo tributario:", error);
        toast.error(
          error?.response?.data?.message || "No se encontró información de incentivos tributarios"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [code]);

  const renderDate = (date?: string | null) => {
    return date ? new Date(date).toLocaleDateString() : "Sin fecha";
  };

  if (loading) return <div className="container mt-4">Cargando...</div>;

  if (!taxIncentive)
    return (
      <div className="container mt-4">
        <p>No se encontró información de incentivos para el proyecto <strong>{code}</strong>.</p>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          ← Volver
        </button>
      </div>
    );

  return (
    <div className="container mt-4">
      <h3>Incentivos Tributarios - Proyecto {code}</h3>
      <ul className="list-group mb-3">
        <li className="list-group-item">
          <strong>Número de Radicado:</strong> {taxIncentive.filingNumberIt || "N/A"}
        </li>
        <li className="list-group-item">
          <strong>Fecha de Radicación:</strong> {renderDate(taxIncentive.dateFilingIt)}
        </li>
        <li className="list-group-item">
          <strong>Valor de la Inversión:</strong> ${taxIncentive.investmentValueIt?.toLocaleString() || "N/A"}
        </li>
        <li className="list-group-item">
          <strong>Valor del Pago:</strong> ${taxIncentive.paymentValueIt?.toLocaleString() || "N/A"}
        </li>
        <li className="list-group-item">
          <strong>Fecha del Pago:</strong> {renderDate(taxIncentive.paymentDateIt)}
        </li>
        <li className="list-group-item">
          <strong>Número de Pago:</strong> {taxIncentive.paymentNumberIt || "N/A"}
        </li>
        <li className="list-group-item">
          <strong>Fecha de Evaluación:</strong> {renderDate(taxIncentive.evaluationDateIt)}
        </li>
        <li className="list-group-item">
          <strong>Número de Certificado:</strong> {taxIncentive.certificateNumberIt || "N/A"}
        </li>
        <li className="list-group-item">
          <strong>Fecha del Certificado:</strong> {renderDate(taxIncentive.certificateDateIt)}
        </li>
      </ul>

      <h5>Beneficiarios Secundarios</h5>
      {taxIncentive.secondaryBeneficiaries.length > 0 ? (
        <ul className="list-group">
          {taxIncentive.secondaryBeneficiaries.map((b, idx) => (
            <li className="list-group-item" key={idx}>
              <strong>Nombre:</strong> {b.name} <br />
              <strong>Documento:</strong> {b.numberDocument}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay beneficiarios secundarios registrados.</p>
      )}

      <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">
        ← Volver
      </button>
    </div>
  );
};

export default TaxIncentiveDetail;
