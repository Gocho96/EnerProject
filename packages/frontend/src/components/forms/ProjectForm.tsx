import { useState, ChangeEvent, FormEvent } from "react";
import { Project } from "../../types/project";
import { toast } from "react-toastify";

interface ProjectFormProps {
  onSubmit: (project: Project) => void;
  initialData?: Project;
  loading?: boolean;
}

interface ProjectFormValues {
  code: string;
  name: string;
  typeOfService: string;
  state: string;
  startContract: string;
  endContract: string;
}

const ProjectForm = ({
  onSubmit,
  initialData,
  loading = false,
}: ProjectFormProps) => {
  const [project, setProject] = useState<ProjectFormValues>({
    code: initialData?.code || "",
    name: initialData?.name || "",
    typeOfService: initialData?.typeOfService || "",
    state: initialData?.state || "",
    startContract: initialData?.startContract
      ? new Date(initialData.startContract).toISOString().split("T")[0]
      : "",
    endContract: initialData?.endContract
      ? new Date(initialData.endContract).toISOString().split("T")[0]
      : "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const validateForm = () => {
    const { code, name, typeOfService, state, startContract } = project;
    if (!code || !name || !typeOfService || !state || !startContract) {
      toast.error("Por favor completa todos los campos obligatorios.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const parsedProject: Project = {
      code: project.code,
      name: project.name,
      typeOfService: project.typeOfService as Project["typeOfService"],
      state: project.state as Project["state"],
      startContract: new Date(project.startContract),
      endContract: project.endContract
        ? new Date(project.endContract)
        : undefined,
    };

    onSubmit(parsedProject);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border border-2 rounded">
      <h2 className="text-center">Nuevo Proyecto</h2>
      <p className="text-center">
        Los campos marcados con (*) son obligatorios.
      </p>

      <div className="form-group p-2">
        <input
          type="text"
          name="code"
          placeholder="Código del proyecto *"
          className="form-control"
          onChange={handleInputChange}
          value={project.code}
          readOnly={!!initialData}
        />
      </div>

      <div className="form-group p-2">
        <input
          type="text"
          name="name"
          placeholder="Nombre del proyecto *"
          className="form-control"
          onChange={handleInputChange}
          value={project.name}
        />
      </div>

      <div className="form-group p-2">
        <select
          name="typeOfService"
          className="form-control"
          onChange={handleInputChange}
          value={project.typeOfService}
        >
          <option value="" disabled hidden>
            Selecciona el tipo *
          </option>
          <option value="Diseño, suministro e instalación SSFV">
            Diseño, suministro e instalación SSFV
          </option>
          <option value="Incentivos tributarios">Incentivos tributarios</option>
          <option value="Análisis de calidad de la energía">
            Análisis de calidad de la energía
          </option>
          <option value="Consultoria técnica">Consultoría técnica</option>
          <option value="Mantenimiento">Mantenimiento</option>
          <option value="Normalización">Normalización</option>
          <option value="Diseño / ingeniería">Diseño / ingeniería</option>
          <option value="Instalación / mano de obra">
            Instalación / mano de obra
          </option>
          <option value="Suministro de materiales / equipos">
            Suministro de materiales / equipos
          </option>
          <option value="Otro servicio">Otro servicio</option>
        </select>
      </div>

      <div className="form-group p-2">
        <select
          name="state"
          className="form-control"
          onChange={handleInputChange}
          value={project.state}
        >
          <option value="" disabled hidden>
            Selecciona el estado *
          </option>
          <option value="Por iniciar">Por iniciar</option>
          <option value="En curso">En curso</option>
          <option value="Pausado">Pausado</option>
          <option value="Finalizado">Finalizado</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      </div>

      <div className="form-group p-2">
        <label className="fw-bold">Fecha de inicio: *</label>
        <input
          type="date"
          name="startContract"
          className="form-control"
          onChange={handleInputChange}
          value={
            project.startContract
              ? new Date(project.startContract).toISOString().slice(0, 10)
              : ""
          }
        />
      </div>

      <div className="form-group p-2">
        <label className="fw-bold">Fecha de finalización:</label>
        <input
          type="date"
          name="endContract"
          className="form-control"
          onChange={handleInputChange}
          value={
            project.endContract
              ? new Date(project.endContract).toISOString().slice(0, 10)
              : ""
          }
        />
      </div>

      <button
        type="submit"
        className="btn btn-success btn-block mt-3 w-100"
        disabled={loading}
      >
        {loading ? "Guardando..." : "Guardar Proyecto"}
      </button>
    </form>
  );
};

export default ProjectForm;
