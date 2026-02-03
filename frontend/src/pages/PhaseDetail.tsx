import { useParams } from "react-router-dom";
import DocumentDetail from "../components/phases/document/DocumentDetail";
import InstallationDetail from "../components/phases/installation/InstallationDetail";
import EngineeringDetail from "../components/phases/engineering/EngineeringDetail";
import ShoppingDetail from "../components/phases/shooping/ShoppingDetail";
import TaxIncentiveDetail from "../components/phases/taxIncentive/TaxIncentiveDetail";
import RetieDetail from "../components/phases/retie/RetieDetail";
import NetworkOperatorDetail from "../components/phases/networkOperator/NetworkOperatorDetail";
import MarketingDetail from "../components/phases/marketing/MarketingDetail";
import MaintenanceDetail from "../components/phases/maintenance/MaintenanceDetail";
import BillingDetail from "../components/phases/billing/BillingDetail";
import { PHASES_MAP } from "../components/tables/ProjectPhases";

const PhaseDetail = () => {
  const { phaseKey } = useParams();

  switch (phaseKey) {
    case "document":
      return <DocumentDetail />;
    case "installation":
      return <InstallationDetail />;
    case "engineering":
      return <EngineeringDetail />;
    case "shopping":
      return <ShoppingDetail />;
    case "taxincentive":
      return <TaxIncentiveDetail />;
    case "retie":
      return <RetieDetail />;
    case "networkoperator":
      return <NetworkOperatorDetail />;
    case "marketing":
      return <MarketingDetail />;
    case "maintenance":
      return <MaintenanceDetail />;
    case "billing":
      return <BillingDetail />;

    default: {
      const phase = PHASES_MAP.find((p) => p.key === phaseKey);
      const label = phase?.label || phaseKey;
      return <p>No se ha encontrado información de {label}</p>;
    }
  }
};

export default PhaseDetail;
