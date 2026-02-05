import React, { useState } from "react";
import { MarketingPlatform, MarketingPublication } from "../../../types/phases/marketing";
import { addPublicationEntry } from "../../../services/MarketingService";
import { toast } from "react-toastify";

interface Props {
  projectId: string;
  onAdded: () => void;
}

const platforms: MarketingPlatform[] = [
  "Facebook",
  "Instagram",
  "Youtube",
  "TikTok",
  "LinkedIn",
  "Sitio web",
  "Otro",
];

const PublicationForm: React.FC<Props> = ({ projectId, onAdded }) => {
  const [form, setForm] = useState<MarketingPublication>({
    platform: undefined,
    publicationDate: "",
    publicationUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.platform || !form.publicationDate) {
      toast.warning("Plataforma y fecha son obligatorias");
      return;
    }

    try {
      await addPublicationEntry(projectId, form);
      toast.success("Publicación agregada");
      setForm({ platform: undefined, publicationDate: "", publicationUrl: "" });
      onAdded();
    } catch (error) {
      toast.error("Error al agregar la publicación");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-3">
      <div className="mb-2">
        <label className="form-label">Plataforma:</label>
        <select
          name="platform"
          className="form-select"
          value={form.platform || ""}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una plataforma</option>
          {platforms.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label className="form-label">Fecha de publicación:</label>
        <input
          type="date"
          name="publicationDate"
          className="form-control"
          value={form.publicationDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-2">
        <label className="form-label">URL de publicación (opcional):</label>
        <input
          type="url"
          name="publicationUrl"
          className="form-control"
          value={form.publicationUrl || ""}
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-primary" type="submit">
        Guardar publicación
      </button>
    </form>
  );
};

export default PublicationForm;
