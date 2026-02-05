import React from "react";
import { Battery } from "../../types/projectDetails";

interface Props {
  data: Battery;
  onChange: (data: Battery) => void;
}

const BatteryForm: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: ["numberBattery", "batteryAmperage", "batteryVoltage"].includes(name)
        ? Number(value)
        : value,
    });
  };

  return (
    <div className="row g-3">
      <div className="col-md-3">
        <label className="form-label">Cantidad</label>
        <input
          type="number"
          className="form-control"
          name="numberBattery"
          value={data.numberBattery ?? ""}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">Amperaje</label>
        <input
          type="number"
          className="form-control"
          name="batteryAmperage"
          value={data.batteryAmperage ?? ""}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">Voltaje</label>
        <input
          type="number"
          className="form-control"
          name="batteryVoltage"
          value={data.batteryVoltage ?? ""}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">Marca</label>
        <input
          type="text"
          className="form-control"
          name="batteryBrand"
          value={data.batteryBrand ?? ""}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">Referencia</label>
        <input
          type="text"
          className="form-control"
          name="batteryReference"
          value={data.batteryReference ?? ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default BatteryForm;
