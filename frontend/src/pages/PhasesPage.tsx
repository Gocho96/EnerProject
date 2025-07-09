import { useParams } from "react-router-dom";
import ProjectPhases from "../components/ProjectPhases";

const ProjectPhasesPage = () => {
  const { code } = useParams<{ code: string }>();

  if (!code) return <p>Proyecto no especificado</p>;

  return <ProjectPhases projectCode={code} />;
};

export default ProjectPhasesPage;
