import React, { useState } from "react";
import { toast } from "react-toastify";
import { ContactPerson, ProjectDetails } from "../../types/projectDetails";
import ContactPersonForm from "./ContactPersonForm";
import {
  addContactPerson,
  updateContactPerson,
  deleteContactPerson,
} from "../../services/ProjectDetailsService";

interface Props {
  projectId: string;
  contacts: ContactPerson[];
  onUpdate: (updated: Partial<ProjectDetails>) => void;
}

const ContactPersonView: React.FC<Props> = ({ projectId, contacts, onUpdate }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

const handleAdd = async (data: ContactPerson) => {
  try {
    const updatedProject = await addContactPerson(projectId, data);
    const lastContact = updatedProject.contactPerson.at(-1);

    onUpdate({ contactPerson: [...contacts, lastContact] });
    toast.success("Contacto agregado");
    setShowForm(false);
  } catch (error: any) {
    toast.error(error.message || "Error al agregar contacto");
  }
};

const handleUpdate = async (data: ContactPerson) => {
  const contactId = (contacts[editingIndex!] as any)._id;
  try {
    const updatedProject = await updateContactPerson(projectId, contactId, data);
    const updatedContact = updatedProject.contactPerson.find(
      (c: any) => c._id === contactId
    );

    if (!updatedContact) throw new Error("Contacto no encontrado en respuesta");

    const updatedList = [...contacts];
    updatedList[editingIndex!] = updatedContact;
    onUpdate({ contactPerson: updatedList });
    toast.success("Contacto actualizado");
    setEditingIndex(null);
  } catch (error: any) {
    toast.error(error.message || "Error al actualizar contacto");
  }
};

const handleDelete = async (index: number) => {
  const contactId = (contacts[index] as any)._id;
  try {
    await deleteContactPerson(projectId, contactId);
    const updatedList = contacts.filter((_, i) => i !== index);
    onUpdate({ contactPerson: updatedList });
    toast.success("Contacto eliminado");
  } catch (error: any) {
    toast.error(error.message || "Error al eliminar contacto");
  }
};


  return (
    <div className="card p-4 mt-4">
      <h5 className="mb-3">Contactos Registrados</h5>

      {contacts.length === 0 ? (
        <p>No hay contactos registrados.</p>
      ) : (
        <ul className="list-group mb-3">
          {contacts.map((contact, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-start flex-column flex-md-row">
              <div className="me-2">
                <strong>Nombre:</strong> {contact.contactName || "N/A"} <br />
                <strong>Cargo:</strong> {contact.contactPosition || "N/A"} <br />
                <strong>Teléfono:</strong> {contact.contactNumber || "N/A"} <br />
                <strong>Correo:</strong> {contact.contactEmail || "N/A"}
              </div>
              <div className="mt-2 mt-md-0 d-flex gap-2">
                <button className="btn btn-sm btn-outline-primary" onClick={() => setEditingIndex(index)}>
                  Editar
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(index)}>
                  Eliminar
                </button>
              </div>
              {editingIndex === index && (
                <div className="mt-3 w-100">
                  <ContactPersonForm
                    initialData={contact}
                    onSubmit={handleUpdate}
                    onCancel={() => setEditingIndex(null)}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {showForm ? (
        <ContactPersonForm
          onSubmit={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <button className="btn btn-success" onClick={() => setShowForm(true)}>
          + Agregar Contacto
        </button>
      )}
    </div>
  );
};

export default ContactPersonView;
