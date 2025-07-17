import { useParams } from "react-router-dom";
import DocumentalDetail from "../components/phases/documental/DocumentalDetail";
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
