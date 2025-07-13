import React from "react";
import { ContactPerson, ProjectDetails } from "../../types/projectDetails";

interface Props {
  projectId: string;
  contacts: ContactPerson[];
  onUpdate: (updated: Partial<ProjectDetails>) => void;
}

const ContactPersonView: React.FC<Props> = ({ contacts }) => {
  return (
    <div className="card p-4 mt-4">
      <h5 className="mb-3">Contactos Registrados</h5>
      {contacts.length === 0 ? (
        <p>No hay contactos registrados.</p>
      ) : (
        <ul className="list-group">
          {contacts.map((contact, index) => (
            <li key={index} className="list-group-item">
              <strong>Nombre:</strong> {contact.contactName || "N/A"} <br />
              <strong>Cargo:</strong> {contact.contactPosition || "N/A"} <br />
              <strong>Teléfono:</strong> {contact.contactNumber || "N/A"} <br />
              <strong>Correo:</strong> {contact.contactEmail || "N/A"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactPersonView;
