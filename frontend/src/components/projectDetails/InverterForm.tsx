import React from "react";
import { Inverter } from "../../types/projectDetails";

interface Props {
  data: Inverter;
  onChange: (data: Inverter) => void;
}

const InverterForm: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: name === "numberInverter" || name === "inverterPower" ? Number(value) : value,
    });
  };

  return (
    <div className="row g-3">
      <div className="col-md-3">
        <label className="form-label">Cantidad</label>
        <input
          type="number"
          className="form-control"
          name="numberInverter"
          value={data.numberInverter ?? ""}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">Potencia (kW)</label>
        <input
          type="number"
          className="form-control"
          name="inverterPower"
          value={data.inverterPower ?? ""}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">Marca</label>
        <input
          type="text"
          className="form-control"
          name="inverterBrand"
          value={data.inverterBrand ?? ""}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">Referencia</label>
        <input
          type="text"
          className="form-control"
          name="inverterReference"
          value={data.inverterReference ?? ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default InverterForm;
