import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config/api";
import { toast } from "react-toastify";

interface Policy {
  _id: string;
  policyType: string;
  policyNumber: string;
  policyValue: number;
  policyDate: string;
  policyExpiration: string;
  policyIssuer: string;
}

interface Contract {
  _id: string;
  contractNumber: string;
  contractDate: string;
  contractValue: number;
  contractExpiration: string;
  policies: Policy[];
}

interface Documental {
  _id: string;
  serviceOrderDate?: string;
  startDate?: string;
  endDate?: string;
  certificateDate?: string;
  contracts: Contract[];
}

const DocumentalDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [documental, setDocumental] = useState<Documental | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocumental = async () => {
      try {
        const response = await axios.get(`${API_URL}/documental/code/${code}`);
        setDocumental(response.data);
      } catch (error: any) {
        console.error("Error al obtener información documental:", error);
        toast.error(
          error.response?.data?.message || "Error al obtener la información documental"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDocumental();
  }, [code]);

  if (loading) return <div className="container mt-4">Cargando...</div>;

  if (!documental)
    return (
      <div className="container mt-4">
        <p>No se encontró información documental para el proyecto con código <strong>{code}</strong>.</p>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">← Volver</button>
      </div>
    );

  return (
    <div className="container mt-4">
      <h3>Información Documental del Proyecto {code}</h3>

      <div className="mb-3">
        <strong>Fecha Orden de Servicio:</strong>{" "}
        {documental.serviceOrderDate ? new Date(documental.serviceOrderDate).toLocaleDateString() : "No disponible"}
        <br />
        <strong>Fecha de Inicio:</strong>{" "}
        {documental.startDate ? new Date(documental.startDate).toLocaleDateString() : "No disponible"}
        <br />
        <strong>Fecha de Fin:</strong>{" "}
        {documental.endDate ? new Date(documental.endDate).toLocaleDateString() : "No disponible"}
        <br />
        <strong>Fecha de Certificado:</strong>{" "}
        {documental.certificateDate ? new Date(documental.certificateDate).toLocaleDateString() : "No disponible"}
      </div>

      <h5>Contratos</h5>
      {documental.contracts.length === 0 ? (
        <p>No hay contratos registrados.</p>
      ) : (
        documental.contracts.map((contract) => (
          <div key={contract._id} className="border p-3 mb-3 rounded">
            <p><strong>Número:</strong> {contract.contractNumber}</p>
            <p><strong>Fecha:</strong> {new Date(contract.contractDate).toLocaleDateString()}</p>
            <p><strong>Valor:</strong> ${contract.contractValue.toLocaleString()}</p>
            <p><strong>Vencimiento:</strong> {new Date(contract.contractExpiration).toLocaleDateString()}</p>

            <h6>Pólizas</h6>
            {contract.policies.length === 0 ? (
              <p>No hay pólizas registradas.</p>
            ) : (
              <ul>
                {contract.policies.map((policy) => (
                  <li key={policy._id}>
                    <strong>{policy.policyType}</strong> - N° {policy.policyNumber} por ${policy.policyValue.toLocaleString()} emitida por {policy.policyIssuer} desde {new Date(policy.policyDate).toLocaleDateString()} hasta {new Date(policy.policyExpiration).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}

      <button onClick={() => navigate(-1)} className="btn btn-secondary">
        ← Volver
      </button>
    </div>
  );
};

export default DocumentalDetail;
