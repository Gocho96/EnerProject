import { useParams } from "react-router-dom";
import DocumentalDetail from "../components/DocumentalDetail";
import InstallationDetail from "../components/InstallationDetail";
import EngineeringDetail from "../components/EngineeringDetail";
import { PHASES_MAP } from "../components/ProjectPhases";


const PhaseDetail = () => {
  const { phaseKey } = useParams();

  switch (phaseKey) {
    case "Documental":
      return <DocumentalDetail />;
    case "Installation":
      return <InstallationDetail />;
    case "Engineering":
      return <EngineeringDetail/>;
    // Agrega más casos según los componentes que tengas
    default: {
      const phase = PHASES_MAP.find((p) => p.key === phaseKey);
      const label = phase?.label || phaseKey;
      return <p>No se ha encontrado información de {label}</p>;
    }
  }
};

export default PhaseDetail;
