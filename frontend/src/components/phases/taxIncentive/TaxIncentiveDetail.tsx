import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getTaxIncentiveByProjectCode,
  updateTaxIncentive,
  addSecondaryBeneficiary,
  updateSecondaryBeneficiary,
  deleteSecondaryBeneficiary,
} from "../../../services/TaxIncentiveService";
import {
  TaxIncentive,
  SecondaryBeneficiary,
} from "../../../types/phases/taxIncentive";
import SecondaryBeneficiaryForm from "./SecondaryBeneficiaryForm";

const TaxIncentiveDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [taxIncentive, setTaxIncentive] = useState<TaxIncentive | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<TaxIncentive>>({});
  const [editBeneficiary, setEditBeneficiary] =
    useState<SecondaryBeneficiary | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!code) return;
        const response = await getTaxIncentiveByProjectCode(code);
        setTaxIncentive(response.data);
        setForm(response.data);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Error al obtener incentivos"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [code]);

  const handleUpdate = async () => {
    if (!taxIncentive) return;
    try {
      const updated = await updateTaxIncentive(taxIncentive._id, form);
      setTaxIncentive(updated.data);
      toast.success("Información actualizada");
    } catch (error) {
      toast.error("Error al actualizar información");
    }
  };

  const handleAddBeneficiary = async (data: SecondaryBeneficiary) => {
    if (!taxIncentive?.projectId) return;
    try {
      const response = await addSecondaryBeneficiary(
        taxIncentive.projectId,
        data
      );
      setTaxIncentive(response.data);
      toast.success("Beneficiario agregado");
    } catch (error) {
      toast.error("Error al agregar beneficiario");
    }
  };

  const handleUpdateBeneficiary = async (data: SecondaryBeneficiary) => {
    if (!taxIncentive?.projectId || !data._id) return;
    try {
      const response = await updateSecondaryBeneficiary(
        taxIncentive.projectId,
        data._id,
        data
      );
      setTaxIncentive(response.data);
      setEditBeneficiary(null);
      toast.success("Beneficiario actualizado");
    } catch (error) {
      toast.error("Error al actualizar beneficiario");
    }
  };

  const handleDeleteBeneficiary = async (beneficiaryId: string) => {
    if (!taxIncentive?.projectId) return;
    try {
      const response = await deleteSecondaryBeneficiary(
        taxIncentive.projectId,
        beneficiaryId
      );
      setTaxIncentive(response.data);
      toast.success("Beneficiario eliminado");
    } catch (error) {
      toast.error("Error al eliminar beneficiario");
    }
  };

  if (loading) return <div className="container mt-4">Cargando...</div>;

  if (!taxIncentive)
    return (
      <div className="container mt-4">
        <p>
          No se encontró información del proyecto <strong>{code}</strong>.
        </p>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          ← Volver
        </button>
      </div>
    );

  return (
    <div className="container mt-4">
      <h3>Incentivos Tributarios - Proyecto {code}</h3>

      <div className="mb-4">
        <label>Número de Radicado</label>
        <input
          className="form-control"
          value={form.filingNumberIt || ""}
          onChange={(e) => setForm({ ...form, filingNumberIt: e.target.value })}
        />
        <label className="mt-2">Fecha de Radicación</label>
        <input
          type="date"
          className="form-control"
          value={form.dateFilingIt?.slice(0, 10) || ""}
          onChange={(e) => setForm({ ...form, dateFilingIt: e.target.value })}
        />
        <label className="mt-2">Valor de Inversión</label>
        <input
          type="number"
          className="form-control"
          value={form.investmentValueIt || ""}
          onChange={(e) =>
            setForm({ ...form, investmentValueIt: Number(e.target.value) })
          }
        />
        <label className="mt-2">Valor del Pago</label>
        <input
          type="number"
          className="form-control"
          value={form.paymentValueIt || ""}
          onChange={(e) =>
            setForm({ ...form, paymentValueIt: Number(e.target.value) })
          }
        />
        <label className="mt-2">Fecha del Pago</label>
        <input
          type="date"
          className="form-control"
          value={form.paymentDateIt?.slice(0, 10) || ""}
          onChange={(e) => setForm({ ...form, paymentDateIt: e.target.value })}
        />
        <label className="mt-2">Número de Pago</label>
        <input
          className="form-control"
          value={form.paymentNumberIt || ""}
          onChange={(e) =>
            setForm({ ...form, paymentNumberIt: e.target.value })
          }
        />
        <label className="mt-2">Fecha de Evaluación</label>
        <input
          type="date"
          className="form-control"
          value={form.evaluationDateIt?.slice(0, 10) || ""}
          onChange={(e) =>
            setForm({ ...form, evaluationDateIt: e.target.value })
          }
        />
        <label className="mt-2">Número de Certificado</label>
        <input
          className="form-control"
          value={form.certificateNumberIt || ""}
          onChange={(e) =>
            setForm({ ...form, certificateNumberIt: e.target.value })
          }
        />
        <label className="mt-2">Fecha del Certificado</label>
        <input
          type="date"
          className="form-control"
          value={form.certificateDateIt?.slice(0, 10) || ""}
          onChange={(e) =>
            setForm({ ...form, certificateDateIt: e.target.value })
          }
        />

        <button onClick={handleUpdate} className="btn btn-primary mt-3">
          Guardar Cambios
        </button>
      </div>

      <h5>Beneficiarios Secundarios</h5>
      {taxIncentive.secondaryBeneficiaries.length > 0 ? (
        <ul className="list-group mb-3">
          {taxIncentive.secondaryBeneficiaries.map((b) => (
            <li
              key={b._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>Nombre:</strong> {b.name} <br />
                <strong>Documento:</strong> {b.numberDocument}
              </div>
              <div className="btn-group ">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setEditBeneficiary(b)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteBeneficiary(b._id!)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay beneficiarios secundarios registrados.</p>
      )}

      {editBeneficiary ? (
        <>
          <h6>Editar Beneficiario</h6>
          <SecondaryBeneficiaryForm
            beneficiary={editBeneficiary}
            onSubmit={handleUpdateBeneficiary}
            onCancel={() => setEditBeneficiary(null)}
            submitText="Actualizar"
          />
        </>
      ) : (
        <>
          <div className="d-flex justify-content-center mb-3">
            <button
              className="btn btn-outline-primary"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? "Cancelar" : "Agregar Beneficiario Secundario"}
            </button>
          </div>

          {showAddForm && (
            <>
              <h6 className="text-center">Nuevo Beneficiario</h6>
              <SecondaryBeneficiaryForm
                onSubmit={(data) => {
                  handleAddBeneficiary(data);
                  setShowAddForm(false);
                }}
                submitText="Agregar"
              />
            </>
          )}
        </>
      )}

      <button onClick={() => navigate(-1)} className="btn btn-secondary mt-4">
        ← Volver
      </button>
    </div>
  );
};

export default TaxIncentiveDetail;
