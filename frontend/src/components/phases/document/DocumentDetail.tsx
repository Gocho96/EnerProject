import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../config/api";
import { toast } from "react-toastify";
import ContractForm from "./ContractForm";
import PolicyForm from "./PolicyForm";
import { Policy, Contract, Document } from "../../../types/document";
import { formatLocalDate } from "../../../utils/dateUtils";
import { getDocumentByProjectCode } from "../../../services/DocumentService";

const DocumentDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [document, setDocumental] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [showContractForm, setShowContractForm] = useState(false);
  const [activeContract, setActiveContract] = useState<Contract | null>(null);
  const [activePolicyForm, setActivePolicyForm] = useState<{
    contractId: string;
    policy?: Policy;
  } | null>(null);

  useEffect(() => {
    fetchDocumental();
  }, [code]);

  const fetchDocumental = async () => {
    try {
      const response = await getDocumentByProjectCode(code || "");
      setDocumental(response);
    } catch (error) {
      toast.error("No se pudo cargar la información de documentación.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    const res = await axios.get(`${API_URL}/document/${code}`);
    setDocumental(res.data);
    setActivePolicyForm(null);
    setActiveContract(null);
    setShowContractForm(false);
  };

  const handleDeletePolicy = async (policyId: string, contractId: string) => {
    if (!document) return;
    const confirm = window.confirm("¿Estás seguro de eliminar esta póliza?");
    if (!confirm) return;

    try {
      await axios.delete(
        `${API_URL}/document/${document._id}/contract/${contractId}/policy/${policyId}`
      );
      toast.success("Póliza eliminada correctamente");
      refreshData();
    } catch (error) {
      toast.error("Error al eliminar la póliza");
      console.error(error);
    }
  };

  const handleDeleteContract = async (contractId: string) => {
    if (!document) return;
    const confirm = window.confirm("¿Estás seguro de eliminar este contrato?");
    if (!confirm) return;

    try {
      await axios.delete(
        `${API_URL}/document/${document._id}/contract/${contractId}`
      );
      toast.success("Contrato eliminado correctamente");
      refreshData();
    } catch (error) {
      toast.error("Error al eliminar el contrato");
      console.error(error);
    }
  };

  if (loading) return <div className="container mt-4">Cargando...</div>;

  if (!document)
    return (
      <div className="container mt-4">
        <p>
          No se encontró información documental para el proyecto con código{" "}
          <strong>{code}</strong>.
        </p>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          ← Volver
        </button>
      </div>
    );

  return (
    <div className="container mt-4">
      <h3>Información Documental del Proyecto {code}</h3>

      <div className="mb-3">
        <label>
          <strong>Fecha Orden de Servicio:</strong>
        </label>
        <input
          type="date"
          className="form-control mb-2"
          placeholder=""
          value={document.serviceOrderDate?.slice(0, 10) || ""}
          onChange={(e) =>
            setDocumental((prev) =>
              prev ? { ...prev, serviceOrderDate: e.target.value } : prev
            )
          }
        />
        <label>
          <strong>Fecha de Inicio:</strong>
        </label>
        <input
          type="date"
          className="form-control mb-2"
          placeholder=""
          value={document.startDate?.slice(0, 10) || ""}
          onChange={(e) =>
            setDocumental((prev) =>
              prev ? { ...prev, startDate: e.target.value } : prev
            )
          }
        />
        <label>
          <strong>Fecha de Fin:</strong>
        </label>
        <input
          type="date"
          className="form-control mb-2"
          placeholder=""
          value={document.endDate?.slice(0, 10) || ""}
          onChange={(e) =>
            setDocumental((prev) =>
              prev ? { ...prev, endDate: e.target.value } : prev
            )
          }
        />
        <label>
          <strong>Fecha de Certificado:</strong>
        </label>
        <input
          type="date"
          className="form-control mb-2"
          placeholder=""
          value={document.certificateDate?.slice(0, 10) || ""}
          onChange={(e) =>
            setDocumental((prev) =>
              prev ? { ...prev, certificateDate: e.target.value } : prev
            )
          }
        />
        <button
          className="btn btn-success mt-2"
          onClick={async () => {
            try {
              await axios.patch(`${API_URL}/document/${document._id}`, {
                serviceOrderDate: document.serviceOrderDate,
                startDate: document.startDate,
                endDate: document.endDate,
                certificateDate: document.certificateDate,
              });
              toast.success("Fechas actualizadas correctamente");
            } catch (error) {
              toast.error("Error al actualizar fechas");
              console.error(error);
            }
          }}
        >
          Guardar cambios
        </button>
      </div>

      <h5>Contratos</h5>
      {document.contracts.length === 0 ? (
        <p>No hay contratos registrados.</p>
      ) : (
        document.contracts.map((contract) =>
          activeContract?._id === contract._id ? (
            <ContractForm
              key={contract._id}
              documentalId={document._id}
              existingContract={contract}
              onContractAdded={refreshData}
              onCancel={() => setActiveContract(null)}
            />
          ) : (
            <div key={contract._id} className="border p-3 mb-3 rounded">
              <p>
                <strong>Número de contrato: </strong> {contract.contractNumber}
              </p>
              <p>
                <strong>Valor de contrato: </strong> $
                {contract.contractValue.toLocaleString()}
              </p>
              <p>
                <strong>Fecha de firma del contrato: </strong>{" "}
                {formatLocalDate(contract.contractDate)}
              </p>
              <p>
                <strong>Fecha de vencimiento del contrato: </strong>{" "}
                {formatLocalDate(contract.contractExpiration)}
              </p>

              <div className="mb-2 d-flex gap-2 justify-content-center">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setActiveContract(contract)}
                >
                  Editar contrato
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteContract(contract._id)}
                >
                  Eliminar contrato
                </button>
              </div>

              <h6>Pólizas</h6>
              {contract.policies.length === 0 ? (
                <p>No hay pólizas registradas.</p>
              ) : (
                <ul>
                  {contract.policies.map((policy) => (
                    <li key={policy._id}>
                      {activePolicyForm?.policy?._id === policy._id ? (
                        <PolicyForm
                          documentalId={document._id}
                          contractId={contract._id}
                          existingPolicy={policy}
                          onPolicyAdded={refreshData}
                          onCancel={() => setActivePolicyForm(null)}
                        />
                      ) : (
                        <div className="d-flex justify-content-between align-items-center">
                          <span>
                            <strong>{policy.policyType}</strong> - N°{" "}
                            {policy.policyNumber} por $
                            {policy.policyValue.toLocaleString()} emitida por{" "}
                            {policy.policyIssuer} desde{" "}
                            {formatLocalDate(policy.policyDate)} hasta{" "}
                            {formatLocalDate(policy.policyExpiration)}
                          </span>
                          <div>
                            <button
                              className="btn btn-sm btn-link text-primary"
                              onClick={() =>
                                setActivePolicyForm({
                                  contractId: contract._id,
                                  policy,
                                })
                              }
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-sm btn-link text-danger"
                              onClick={() =>
                                handleDeletePolicy(policy._id, contract._id)
                              }
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {!activePolicyForm?.policy && (
                <>
                  <button
                    className="btn btn-sm btn-outline-primary mb-2"
                    onClick={() =>
                      setActivePolicyForm((prev) =>
                        prev?.contractId === contract._id
                          ? null
                          : { contractId: contract._id }
                      )
                    }
                  >
                    {activePolicyForm?.contractId === contract._id
                      ? "Cancelar"
                      : "Agregar póliza"}
                  </button>

                  {activePolicyForm?.contractId === contract._id &&
                    !activePolicyForm.policy &&
                    document && (
                      <PolicyForm
                        documentalId={document._id}
                        contractId={contract._id}
                        onPolicyAdded={refreshData}
                        onCancel={() => setActivePolicyForm(null)}
                      />
                    )}
                </>
              )}
            </div>
          )
        )
      )}

      <button
        className="btn btn-outline-danger me-2"
        onClick={() => {
          setShowContractForm((prev) => !prev);
          setActiveContract(null);
        }}
      >
        {showContractForm ? "Cancelar" : "Agregar contrato"}
      </button>

      {showContractForm && document && !activeContract && (
        <ContractForm
          documentalId={document._id}
          onContractAdded={refreshData}
        />
      )}

      <button onClick={() => navigate(-1)} className="btn btn-secondary">
        ← Volver
      </button>
    </div>
  );
};

export default DocumentDetail;
