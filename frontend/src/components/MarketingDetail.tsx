import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getMarketingByProjectCode } from "../services/MarketingService";
import { Marketing } from "../types/marketing";

const MarketingDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [marketing, setMarketing] = useState<Marketing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketing = async () => {
      try {
        if (!code) return;
        const data = await getMarketingByProjectCode(code);
        setMarketing(data);
      } catch (error: any) {
        console.error("Error al obtener información de marketing:", error);
        toast.error(
          error.message || "No se encontró información de marketing"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMarketing();
  }, [code]);

  const renderDate = (date?: string) =>
    date ? new Date(date).toLocaleDateString() : "Sin fecha";

  if (loading) return <div className="container mt-4">Cargando...</div>;

  if (!marketing)
    return (
      <div className="container mt-4">
        <p>
          No se encontró información de marketing para el proyecto{" "}
          <strong>{code}</strong>.
        </p>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          ← Volver
        </button>
      </div>
    );

  return (
    <div className="container mt-4">
      <h3>Marketing - Proyecto {code}</h3>

      <ul className="list-group">
        <li className="list-group-item">
          <strong>Encuesta enviada:</strong>{" "}
          {marketing.sendSurvey ? "Sí" : "No"}
        </li>
        <li className="list-group-item">
          <strong>Fecha de envío:</strong> {renderDate(marketing.sendSurveyDate)}
        </li>
      </ul>

      <h5 className="mt-4">Publicaciones</h5>
      {marketing.publications.length === 0 ? (
        <p>No hay publicaciones registradas.</p>
      ) : (
        <ul className="list-group">
          {marketing.publications.map((pub, index) => (
            <li key={index} className="list-group-item">
              <strong>Plataforma:</strong> {pub.platform || "N/A"} <br />
              <strong>Fecha:</strong> {renderDate(pub.publicationDate)} <br />
              <strong>URL:</strong>{" "}
              {pub.publicationUrl ? (
                <a href={pub.publicationUrl} target="_blank" rel="noreferrer">
                  {pub.publicationUrl}
                </a>
              ) : (
                "N/A"
              )}
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">
        ← Volver
      </button>
    </div>
  );
};

export default MarketingDetail;
