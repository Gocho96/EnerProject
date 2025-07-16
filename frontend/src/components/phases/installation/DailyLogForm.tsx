import React from "react";
import { DailyLogEntry } from "../../../types/installation";

interface Props {
  log: DailyLogEntry;
  onChange: (log: DailyLogEntry) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  submitLabel?: string;
}

const DailyLogForm: React.FC<Props> = ({
  log,
  onChange,
  onSubmit,
  onCancel,
  submitLabel = "Guardar",
}) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="mb-2">
          <label>Fecha:</label>
          <input
            type="date"
            className="form-control"
            value={log.date}
            onChange={(e) => onChange({ ...log, date: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <label>Contenido:</label>
          <textarea
            className="form-control"
            value={log.content}
            onChange={(e) => onChange({ ...log, content: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <label>Novedades:</label>
          <textarea
            className="form-control"
            value={log.installationNews}
            onChange={(e) =>
              onChange({ ...log, installationNews: e.target.value })
            }
          />
        </div>
        <button className="btn btn-primary me-2" onClick={onSubmit}>
          {submitLabel}
        </button>
        {onCancel && (
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
};

export default DailyLogForm;
