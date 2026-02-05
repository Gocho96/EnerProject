import { Marketing } from "../../models/phases/marketingModel";
import { filterUpdateData } from "../../utils/filterUpdateData";

// ----- CREATE -----
export const createMarketingPhaseService = async (projectId: string) => {
  const phaseFound = await Marketing.findOne({ projectId });
  if (phaseFound) return phaseFound;

  return await Marketing.create({ projectId });
};

export const addPublicationService = async (projectId: string, data: any) => {
  const marketing = await Marketing.findOne({ projectId });
  if (!marketing) {
    throw new Error("MARKETING_NOT_FOUND");
  }

  const publicationFound = marketing.publications.some(
    (record) => record.platform === data.platform && record.publicationTitle === data.publicationTitle
  );

  if (publicationFound) {
    throw new Error("PUBLICATION_ALREADY_EXISTS");
  }

  marketing.publications.push(data);
  return await marketing.save();
};

// ----- READ -----
export const getAllMarketingsService = async () => {
  return await Marketing.find().sort({ createdAt: -1 });
};

export const getMarketingService = async (projectId: string) => {
    const marketingFound = await Marketing.findOne({ projectId });
    if (!marketingFound) {
      throw new Error("MARKETING_NOT_FOUND");
    }   
  return marketingFound;
};

export const getPublicationService = async (projectId: string, publicationId: string) => {
    const marketingFound = await Marketing.findOne({ projectId });

    if (!marketingFound) {
      throw new Error("MARKETING_NOT_FOUND");
    }
    const publication = marketingFound.publications.id(publicationId);
    if (!publication) {
      throw new Error("PUBLICATION_RECORD_NOT_FOUND");
    }
  return { projectId, publication };
};

// ----- UPDATE -----
export const updateMarketingService = async (projectId: string, data: any) => {
  const updateData = filterUpdateData(data);

  const marketing = await Marketing.findOneAndUpdate({ projectId }, updateData, { new: true });
  if (!marketing) {
    throw new Error("MARKETING_NOT_FOUND");
  }
  return marketing;
};

export const updatePublicationService = async (projectId: string, publicationId: string, data: any) => {
  const updateData = filterUpdateData(data);

  const marketingFound = await Marketing.findOne({ projectId });
  if (!marketingFound) {
    throw new Error("MARKETING_NOT_FOUND");
  }

  const publication = marketingFound.publications.id(publicationId);
  if (!publication) {
    throw new Error("PUBLICATION_NOT_FOUND");
  }

  Object.assign(publication, updateData);
  marketingFound.markModified("publication");
  await marketingFound.save();
  return marketingFound.publications.id(publicationId);
}

// ----- DELETE -----
export const deleteMarketingPhaseService = async (projectId: string) => {
  const marketing = await Marketing.findOneAndDelete({ projectId });
  if (!marketing) {
    throw new Error("MARKETING_NOT_FOUND");
  }
  return marketing;
}

export const deletePublicationService = async (projectId: string, publicationId: string) => {
  const marketingFound = await Marketing.findOne({ projectId });
  if (!marketingFound) {
    throw new Error("MARKETING_NOT_FOUND");
  } 
  const publication = marketingFound.publications.id(publicationId);
  if (!publication) {
    throw new Error("PUBLICATION_NOT_FOUND");
  }
  publication.deleteOne();
  await marketingFound.save();
  return marketingFound;
};