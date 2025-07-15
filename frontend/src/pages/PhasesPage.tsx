import { useParams, useNavigate } from "react-router-dom";
import ProjectPhases from "../components/ProjectPhases";

const ProjectPhasesPage = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  if (!code) return <p>Proyecto no especificado</p>;

  return (
    <div className="container mt-4">
      <button
        onClick={() => navigate(`/project-details/${code}`)}
        className="btn btn-outline-primary mb-3"
      >
        Ver Detalles del Proyecto
      </button>

      <ProjectPhases projectCode={code} />
    </div>
  );
};

export default ProjectPhasesPage;
