import React from "react";
import { SolarPanel } from "../../types/projectDetails";

interface Props {
  data: SolarPanel;
  onChange: (data: SolarPanel) => void;
}

const SolarPanelForm: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: name === "numberPanels" || name === "panelPower" ? Number(value) : value,
    });
  };

  return (
    <div className="row g-3">
      <div className="col-md-3">
        <label className="form-label">Cantidad</label>
        <input
          type="number"
          className="form-control"
          name="numberPanels"
          value={data.numberPanels ?? ""}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">Potencia (W)</label>
        <input
          type="number"
          className="form-control"
          name="panelPower"
          value={data.panelPower ?? ""}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">Marca</label>
        <input
          type="text"
          className="form-control"
          name="panelBrand"
          value={data.panelBrand ?? ""}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">Referencia</label>
        <input
          type="text"
          className="form-control"
          name="panelReference"
          value={data.panelReference ?? ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SolarPanelForm;
