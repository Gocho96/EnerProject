import { useParams } from "react-router-dom";
import DocumentalDetail from "../components/phases/documental/DocumentalDetail";
import InstallationDetail from "../components/phases/InstallationDetail";
import EngineeringDetail from "../components/phases/engineering/EngineeringDetail";
import ShoppingDetail from "../components/phases/ShoppingDetail";
import TaxIncentiveDetail from "../components/phases/TaxIncentiveDetail";
import RetieDetail from "../components/phases/RetieDetail";
import NetworkOperatorDetail from "../components/phases/NetworkOperatorDetail";
import MarketingDetail from "../components/phases/MarketingDetail";
import MaintenanceDetail from "../components/phases/MaintenanceDetail";
import BillingDetail from "../components/phases/BillingDetail";
import { PHASES_MAP } from "../components/phases/ProjectPhases";

const PhaseDetail = () => {
  const { phaseKey } = useParams();

  switch (phaseKey) {
    case "Documental":
      return <DocumentalDetail />;
    case "Installation":
      return <InstallationDetail />;
    case "Engineering":
      return <EngineeringDetail />;
    case "Shopping":
      return <ShoppingDetail />;
    case "TaxIncentive":
      return <TaxIncentiveDetail />;
    case "Retie":
      return <RetieDetail />;
    case "NetworkOperator":
      return <NetworkOperatorDetail />;
    case "Marketing":
      return <MarketingDetail />;
    case "Maintenance":
      return <MaintenanceDetail />;
    case "Billing":
      return <BillingDetail />;

    default: {
      const phase = PHASES_MAP.find((p) => p.key === phaseKey);
      const label = phase?.label || phaseKey;
      return <p>No se ha encontrado información de {label}</p>;
    }
  }
};

export default PhaseDetail;
