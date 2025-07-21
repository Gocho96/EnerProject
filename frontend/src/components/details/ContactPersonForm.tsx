import React, { useState, useEffect } from "react";
import { ContactPerson } from "../../types/projectDetails";

interface Props {
  initialData?: ContactPerson;
  onSubmit: (data: ContactPerson) => void;
  onCancel: () => void;
}

const ContactPersonForm: React.FC<Props> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<ContactPerson>({
    contactName: "",
    contactPosition: "",
    contactNumber: undefined,
    contactEmail: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "contactNumber" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-2">
        <input
          type="text"
          name="contactName"
          value={formData.contactName || ""}
          onChange={handleChange}
          placeholder="Nombre"
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          name="contactPosition"
          value={formData.contactPosition || ""}
          onChange={handleChange}
          placeholder="Cargo"
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <input
          type="number"
          name="contactNumber"
          value={formData.contactNumber || ""}
          onChange={handleChange}
          placeholder="Teléfono"
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <input
          type="email"
          name="contactEmail"
          value={formData.contactEmail || ""}
          onChange={handleChange}
          placeholder="Correo electrónico"
          className="form-control"
        />
      </div>
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          {initialData ? "Actualizar" : "Agregar"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ContactPersonForm;
