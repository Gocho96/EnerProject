import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getMarketingByProjectCode,
  updateSurveyInfo,
} from "../../../services/MarketingService";
import { Marketing } from "../../../types/marketing";
import PublicationForm from "./PublicationForm";

const MarketingDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const [marketing, setMarketing] = useState<Marketing | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPublicationForm, setShowPublicationForm] = useState(false);
  const [surveyData, setSurveyData] = useState({
    sendSurvey: false,
    sendSurveyDate: "",
  });

  useEffect(() => {
    const fetchMarketing = async () => {
      try {
        if (!code) return;
        const data = await getMarketingByProjectCode(code);
        setMarketing(data);
        setSurveyData({
          sendSurvey: data.sendSurvey,
          sendSurveyDate: data.sendSurveyDate
            ? new Date(data.sendSurveyDate).toISOString().split("T")[0]
            : "",
        });
      } catch (error: any) {
        console.error("Error al obtener información de marketing:", error);
        toast.error(error.message || "No se encontró información de marketing");
      } finally {
        setLoading(false);
      }
    };

    fetchMarketing();
  }, [code]);

  const renderDate = (date?: string) =>
    date ? new Date(date).toLocaleDateString() : "Sin fecha";

  const handleSurveyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, type } = target;
    const value = type === "checkbox" ? target.checked : target.value;

    setSurveyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSurveySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!marketing) return;

    try {
      await updateSurveyInfo(marketing.projectId, {
        sendSurvey: surveyData.sendSurvey,
        sendSurveyDate: surveyData.sendSurveyDate
          ? new Date(surveyData.sendSurveyDate)
          : null,
      });

      toast.success("Encuesta actualizada");

      setMarketing((prev) =>
        prev
          ? {
              ...prev,
              sendSurvey: surveyData.sendSurvey,
              sendSurveyDate: surveyData.sendSurveyDate,
            }
          : prev
      );
    } catch {
      toast.error("Error al actualizar la información de encuesta");
    }
  };

  const handlePublicationAdded = async () => {
    if (!code) return;
    try {
      const updated = await getMarketingByProjectCode(code);
      setMarketing(updated);
      setShowPublicationForm(false);
    } catch {
      toast.error("Error al recargar publicaciones");
    }
  };

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

      {/* Encuesta */}
      <form onSubmit={handleSurveySubmit} className="card p-3 mb-4">
        <div className="form-check mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="sendSurvey"
            name="sendSurvey"
            checked={surveyData.sendSurvey}
            onChange={handleSurveyChange}
          />
          <label htmlFor="sendSurvey" className="form-check-label">
            ¿Encuesta enviada?
          </label>
        </div>
        <div className="mb-2">
          <label className="form-label">Fecha de envío:</label>
          <input
            type="date"
            className="form-control"
            name="sendSurveyDate"
            value={surveyData.sendSurveyDate}
            onChange={handleSurveyChange}
            disabled={!surveyData.sendSurvey}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Guardar encuesta
        </button>
      </form>

      {/* Publicaciones */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">Publicaciones</h5>
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => setShowPublicationForm(!showPublicationForm)}
        >
          {showPublicationForm ? "Cancelar" : "Agregar publicación"}
        </button>
      </div>

      {showPublicationForm && marketing.projectId && (
        <PublicationForm
          projectId={marketing.projectId}
          onAdded={handlePublicationAdded}
        />
      )}

      {marketing.publications.length === 0 ? (
        <p>No hay publicaciones registradas.</p>
      ) : (
        <ul className="list-group mb-3">
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

      <button onClick={() => navigate(-1)} className="btn btn-secondary">
        ← Volver
      </button>
    </div>
  );
};

export default MarketingDetail;
