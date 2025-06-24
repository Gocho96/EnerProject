import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import { Project } from "../types/project";

interface ProjectFormProps {
  onSubmit: (project: Project) => void;
  initialData?: Project;
}

const ProjectForm = ({ onSubmit, initialData }: ProjectFormProps) => {
  const [project, setProject] = useState<Project>(
    initialData || {
      code: "",
      name: "",
      type_service: "",
      state: "",
      start_contract: new Date(),
      end_contract: new Date(),
    }
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "start_contract" || name === "end_contract" ? new Date(value) : value;
    setProject({ ...project, [name]: parsedValue });
  };

  const validateForm = () => {
    const { code, name, type_service, state, start_contract, end_contract } = project;
    if (!code || !name || !type_service || !state || !start_contract || !end_contract ) {
      toast.error("Por favor completa todos los campos.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(project);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border border-2 rounded">
      <h2 className="text-center">Nuevo Proyecto</h2>

      <div className="form-group p-2">
        <input
          type="text"
          name="code"
          placeholder="Código del proyecto"
          className="form-control"
          onChange={handleInputChange}
          value={project.code}
        />
      </div>

      <div className="form-group p-2">
        <input
          type="text"
          name="name"
          placeholder="Nombre del proyecto"
          className="form-control"
          onChange={handleInputChange}
          value={project.name}
        />
      </div>

      <div className="form-group p-2">
        <input
          type="text"
          name="type_service"
          placeholder="Tipo de servicio"
          className="form-control"
          onChange={handleInputChange}
          value={project.type_service}
        />
      </div>

      <div className="form-group p-2">
        <select
          name="state"
          className="form-control"
          onChange={handleInputChange}
          value={project.state}
        >
          <option value="">Selecciona el estado</option>
          <option value="Finalizado">Finalizado</option>
          <option value="En curso">En curso</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      </div>

      <div className="form-group p-2">
        <label className="fw-bold">Inicio del contrato:</label>
        <input
          type="date"
          name="start_contract"
          className="form-control"
          onChange={handleInputChange}
          value={project.start_contract.toISOString().split("T")[0]}
        />
      </div>

      <div className="form-group p-2">
        <label className="fw-bold">Fin del contrato:</label>
        <input
          type="date"
          name="end_contract"
          className="form-control"
          onChange={handleInputChange}
          value={project.end_contract.toISOString().split("T")[0]}
        />
      </div>

      <button type="submit" className="btn btn-success btn-block mt-3 w-100">
        Guardar Proyecto
      </button>
    </form>
  );
};

export default ProjectForm;
