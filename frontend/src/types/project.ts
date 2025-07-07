export interface Project {
  _id?: string;
  code: string;
  name: string;
  typeOfService:
    | "Diseño, suministro e instalación SSFV"
    | "Incentivos tributarios"
    | "Análisis de calidad de la energía"
    | "Consultoria técnica"
    | "Mantenimiento"
    | "Normalización"
    | "Diseño / ingeniería"
    | "Instalación / mano de obra"
    | "Suministro de materiales / equipos"
    | "Otro servicio";
  state: "Por iniciar" | "En curso" | "Finalizado" | "Cancelado";
  startContract?: Date | string | null;
  endContract?: Date | string | null;
  nextMaintenance?: Date;
  createdAt?: string;
  updatedAt?: string;
}
