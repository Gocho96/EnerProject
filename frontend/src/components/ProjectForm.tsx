import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Project } from "../types/project";
import { createProject } from "../services/ProjectService";
import { createDocumental } from "../services/DocumentalService";
import { createEngineering } from "../services/EngineeringService";
import { createShopping } from "../services/ShoppingService";
import { createInstallation } from "../services/InstallationService";
import { createTaxIncentive } from "../services/TaxIncentiveService";
import { createRetie } from "../services/RetieService";
import { createNetworkOperator } from "../services/NetworkOperadorService";
import { createMarketing } from "../services/MarketingService";
import { createMaintenanceDocument } from "../services/MaintenanceService";
import { createBilling } from "../services/BillingService";
import { createProjectDetails } from "../services/ProjectDetailsService";

interface ProjectFormProps {
  onSubmit: (project: Project) => void;
  initialData?: Project;
}

interface ProjectFormValues {
  code: string;
  name: string;
  typeOfService: string;
  state: string;
  startContract: string;
  endContract: string;
}

const ProjectForm = ({ onSubmit, initialData }: ProjectFormProps) => {
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectFormValues>({
    code: initialData?.code || "",
    name: initialData?.name || "",
    typeOfService: initialData?.typeOfService || "",
    state: initialData?.state || "Por iniciar",
    startContract: initialData?.startContract
      ? new Date(initialData.startContract).toISOString().split("T")[0]
      : "",
    endContract: initialData?.endContract
      ? new Date(initialData.endContract).toISOString().split("T")[0]
      : "",
  });

  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

    setLoading(true);

    try {
      const newProject = await createProject(parsedProject);

      await Promise.all([
        createDocumental({ projectId: newProject._id }),
        createEngineering({ projectId: newProject._id }),
        createShopping({ projectId: newProject._id }),
        createInstallation({ projectId: newProject._id }),
        createTaxIncentive({ projectId: newProject._id }),
        createRetie({ projectId: newProject._id }),
        createNetworkOperator({ projectId: newProject._id }),
        createMarketing({ projectId: newProject._id }),
        createMaintenanceDocument({ projectId: newProject._id }),
        createBilling({ projectId: newProject._id }),
        createProjectDetails({
          projectId: newProject._id,
          projectOwner: "",
          typeDocument: undefined,
          documentNumber: "",
          address: "",
          location: "",
          city: "",
          department: "",
          contactPerson: [],
          solarPanels: [],
          inverters: [],
          batteries: [],
        }),
      ]);

      toast.success("Proyecto creado correctamente.");
      navigate(`/project/${newProject.code}`);

      onSubmit?.(newProject);
    } catch (error: any) {
      console.error("Error al crear el proyecto");

      const errorMessage =
        error?.response?.data?.message || "Error al crear el proyecto.";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
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
          readOnly={!!initialData}
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
        <select
          name="typeOfService"
          className="form-control"
          onChange={handleInputChange}
          value={project.typeOfService}
        >
          <option value="">Selecciona el tipo de servicio</option>
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
          <option value="">Selecciona el estado</option>
          <option value="Por iniciar">Por iniciar</option>
          <option value="En curso">En curso</option>
          <option value="Pausado">Pausado</option>
          <option value="Finalizado">Finalizado</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      </div>

      <div className="form-group p-2">
        <label className="fw-bold">Inicio del proyecto:</label>
        <input
          type="date"
          name="startContract"
          className="form-control"
          onChange={handleInputChange}
          value={project.startContract}
        />
      </div>

      <div className="form-group p-2">
        <label className="fw-bold">Fin del proyecto:</label>
        <input
          type="date"
          name="endContract"
          className="form-control"
          onChange={handleInputChange}
          value={project.endContract}
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
