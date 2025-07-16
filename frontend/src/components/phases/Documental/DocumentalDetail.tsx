import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../config/api";
import { toast } from "react-toastify";
import ContractForm from "./ContractForm";
import PolicyForm from "./PolicyForm";
import { PolicyType } from "../../../types/documental";

interface Policy {
  _id: string;
  policyType: PolicyType;
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
      const response = await axios.get(`${API_URL}/documental/code/${code}`);
      setDocumental(response.data);
    } catch (error: any) {
      toast.error("Error al obtener información documental");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    const res = await axios.get(`${API_URL}/documental/code/${code}`);
    setDocumental(res.data);
    setActivePolicyForm(null);
    setActiveContract(null);
    setShowContractForm(false);
  };

  const handleDeletePolicy = async (policyId: string, contractId: string) => {
    if (!documental) return;
    const confirm = window.confirm("¿Estás seguro de eliminar esta póliza?");
    if (!confirm) return;

    try {
      await axios.delete(
        `${API_URL}/documental/${documental._id}/contract/${contractId}/policy/${policyId}`
      );
      toast.success("Póliza eliminada correctamente");
      refreshData();
    } catch (error) {
      toast.error("Error al eliminar la póliza");
      console.error(error);
    }
  };

  const handleDeleteContract = async (contractId: string) => {
    if (!documental) return;
    const confirm = window.confirm("¿Estás seguro de eliminar este contrato?");
    if (!confirm) return;

    try {
      await axios.delete(`${API_URL}/documental/${documental._id}/contract/${contractId}`);
      toast.success("Contrato eliminado correctamente");
      refreshData();
    } catch (error) {
      toast.error("Error al eliminar el contrato");
      console.error(error);
    }
  };

  if (loading) return <div className="container mt-4">Cargando...</div>;

  if (!documental)
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
        <label><strong>Fecha Orden de Servicio:</strong></label>
        <input
          type="date"
          className="form-control mb-2"
          value={documental.serviceOrderDate?.slice(0, 10) || ""}
          onChange={(e) =>
            setDocumental((prev) =>
              prev ? { ...prev, serviceOrderDate: e.target.value } : prev
            )
          }
        />
        <label><strong>Fecha de Inicio:</strong></label>
        <input
          type="date"
          className="form-control mb-2"
          value={documental.startDate?.slice(0, 10) || ""}
          onChange={(e) =>
            setDocumental((prev) =>
              prev ? { ...prev, startDate: e.target.value } : prev
            )
          }
        />
        <label><strong>Fecha de Fin:</strong></label>
        <input
          type="date"
          className="form-control mb-2"
          value={documental.endDate?.slice(0, 10) || ""}
          onChange={(e) =>
            setDocumental((prev) =>
              prev ? { ...prev, endDate: e.target.value } : prev
            )
          }
        />
        <label><strong>Fecha de Certificado:</strong></label>
        <input
          type="date"
          className="form-control mb-2"
          value={documental.certificateDate?.slice(0, 10) || ""}
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
              await axios.put(`${API_URL}/documental/${documental._id}`, {
                serviceOrderDate: documental.serviceOrderDate,
                startDate: documental.startDate,
                endDate: documental.endDate,
                certificateDate: documental.certificateDate,
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
      {documental.contracts.length === 0 ? (
        <p>No hay contratos registrados.</p>
      ) : (
        documental.contracts.map((contract) =>
          activeContract?._id === contract._id ? (
            <ContractForm
              key={contract._id}
              documentalId={documental._id}
              existingContract={contract}
              onContractAdded={refreshData}
              onCancel={() => setActiveContract(null)}
            />
          ) : (
            <div key={contract._id} className="border p-3 mb-3 rounded">
              <p><strong>Número:</strong> {contract.contractNumber}</p>
              <p><strong>Fecha:</strong> {new Date(contract.contractDate).toLocaleDateString()}</p>
              <p><strong>Valor:</strong> ${contract.contractValue.toLocaleString()}</p>
              <p><strong>Vencimiento:</strong> {new Date(contract.contractExpiration).toLocaleDateString()}</p>
              
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
                          documentalId={documental._id}
                          contractId={contract._id}
                          existingPolicy={policy}
                          onPolicyAdded={refreshData}
                          onCancel={() => setActivePolicyForm(null)}
                        />
                      ) : (
                        <div className="d-flex justify-content-between align-items-center">
                          <span>
                            <strong>{policy.policyType}</strong> - N° {policy.policyNumber} por ${policy.policyValue.toLocaleString()} emitida por {policy.policyIssuer} desde {new Date(policy.policyDate).toLocaleDateString()} hasta {new Date(policy.policyExpiration).toLocaleDateString()}
                          </span>
                          <div>
                            <button
                              className="btn btn-sm btn-link text-primary"
                              onClick={() =>
                                setActivePolicyForm({ contractId: contract._id, policy })
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
                        prev?.contractId === contract._id ? null : { contractId: contract._id }
                      )
                    }
                  >
                    {activePolicyForm?.contractId === contract._id ? "Cancelar" : "Agregar póliza"}
                  </button>

                  {activePolicyForm?.contractId === contract._id &&
                    !activePolicyForm.policy && documental && (
                      <PolicyForm
                        documentalId={documental._id}
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

      {showContractForm && documental && !activeContract && (
        <ContractForm
          documentalId={documental._id}
          onContractAdded={refreshData}
        />
      )}

      <button onClick={() => navigate(-1)} className="btn btn-secondary">
        ← Volver
      </button>
    </div>
  );
};

export default DocumentalDetail;