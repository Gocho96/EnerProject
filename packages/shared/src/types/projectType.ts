export interface Project {
  _id: string;
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
  state: 
    | "Por iniciar"
    | "En curso"
    | "Pausado"
    | "Finalizado"
    | "Cancelado";
  startContract?: Date;
  endContract?: Date;
  nextMaintenance?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateProjectInput = Omit<Project, '_id' | 'createdAt' | 'updatedAt'>;
export type UpdateProjectInput = Partial<CreateProjectInput>;