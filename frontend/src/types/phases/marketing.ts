export type MarketingPlatform =
  | "Facebook"
  | "Instagram"
  | "Youtube"
  | "TikTok"
  | "LinkedIn"
  | "Sitio web"
  | "Otro";

export interface MarketingPublication {
  platform?: MarketingPlatform;
  publicationDate?: string;
  publicationUrl?: string;
}

export interface Marketing {
  _id: string;
  projectId: string;
  sendSurvey: boolean;
  sendSurveyDate?: string;
  publications: MarketingPublication[];
  createdAt: string;
  updatedAt: string;
}
