export interface Engineering {
  _id: string;
  projectId: string;

  statusElectricalPlan: boolean;
  dateElectricalPlan?: string;

  statusConstructionPlan: boolean;
  dateConstructionPlan?: string;

  statusUnifilar: boolean;
  dateUnifilar?: string;

  statusPlantModel: boolean;
  datePlantModel?: string;

  statusMemories: boolean;
  dateMemories?: string;

  createdAt: string;
  updatedAt: string;
}
