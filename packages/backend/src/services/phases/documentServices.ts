import { Document } from "../../models/phases/documentModel";
import { filterUpdateData } from "../../utils/filterUpdateData";
import { Types } from "mongoose";

// ----- CREATE -----
export const createDocumentPhaseService = async (projectId: string) => {
  const phaseFound = await Document.findOne({ projectId });
  if (phaseFound) return phaseFound;

  return await Document.create({ projectId });
};

export const addContractService = async (projectId: string, data: any) => {
  const document = await Document.findOne({ projectId });
  if (!document) {
    throw new Error("DOCUMENT_NOT_FOUND");
  }

  const contractFound = document.contracts.some(
    (contract) => contract.contractNumber === data.contractNumber,
  );

  if (contractFound) {
    throw new Error("CONTRACT_ALREADY_EXISTS");
  }

  document.contracts.push(data);

  return await document.save();
};

export const addPolicyService = async (projectId: string, contractId: string, data: any,) => {
  const document = await Document.findOne({
    projectId: new Types.ObjectId(projectId),
    "contracts._id": new Types.ObjectId(contractId),
  });

  if (!document) {
    throw new Error("DOCUMENT_NOT_FOUND");
  }

  const contract = document.contracts.id(contractId);

  if (!contract) {
    throw new Error("CONTRACT_NOT_FOUND");
  }

  const policyFound = contract.policies.some(
    (policy) => policy.policyNumber === data.policyNumber,
  );

  if (policyFound) {
    throw new Error("POLICY_ALREADY_EXISTS");
  }

  contract.policies.push(data);

  return await document.save();
};

// ----- READ -----
export const getAllDocumentsService = async () => {
  return await Document.find().sort({ createdAt: -1 });
};

export const getAllContractsService = async () => {
  const documentsfound = await Document.find();
  const allContracts = documentsfound.flatMap((document) =>
    document.contracts.map((contract) => ({
      ...contract.toObject(),
      projectId: document.projectId,
    })),
  );
  return allContracts;
};

export const getAllPoliciesService = async () => {
  const documentsfound = await Document.find();
  const allPolicies = documentsfound.flatMap((document) =>
    document.contracts.flatMap((contract) =>
      contract.policies.map((policy) => ({
        ...policy.toObject(),
        contractId: contract._id,
        projectId: document.projectId,
      })),
    ),
  );
  return allPolicies;
};

export const getDocumentService = async (projectId: string) => {
  const documentFound = await Document.findOne({ projectId });
  if (!documentFound) {
    throw new Error("DOCUMENT_NOT_FOUND");
  }
  return documentFound;
};

export const getContractService = async (projectId: string, contractId: string) => {
  const documentFound = await Document.findOne({ projectId });

  if (!documentFound) {
    throw new Error("DOCUMENT_NOT_FOUND");
  }

  const contract = documentFound.contracts.id(contractId);
  if (!contract) {
    throw new Error("CONTRACT_NOT_FOUND");
  }
  return contract;
};

export const getPolicyService = async (projectId: string, contractId: string, policyId: string) => {
  const contractFound = await Document.findOne({ projectId });

  if (!contractFound) {
    throw new Error("DOCUMENT_NOT_FOUND");
  }

  const contract = contractFound.contracts.id(contractId);
  if (!contract) {
    throw new Error("CONTRACT_NOT_FOUND");
  }

  const policy = contract.policies.id(policyId);
  if (!policy) {
    throw new Error("POLICY_NOT_FOUND");
  }
  return policy;
};

// ----- UPDATE -----
export const updateDocumentService = async (projectId: string, data: any) => {
  const updateData = filterUpdateData(data);

  const document = await Document.findOneAndUpdate({ projectId }, updateData, {  new: true });
  if (!document) {
    throw new Error("DOCUMENT_NOT_FOUND");
  }
  return document;
};

export const updateContractService = async (projectId: string, contractId: string, data: any) => {
  const updateData = filterUpdateData(data);

  const documentfound = await Document.findOne({ projectId });
  if (!documentfound) {
    throw new Error("DOCUMENT_NOT_FOUND");
  }

  const contract = documentfound.contracts.id(contractId);
  if (!contract) {
    throw new Error("CONTRACT_NOT_FOUND");
  }

  Object.assign(contract, updateData);
  documentfound.markModified("contracts");
  await documentfound.save();
  return documentfound.contracts.id(contractId);
};

export const updatePolicyService = async (projectId: string, contractId: string, policyId: string, data: any, ) => {
  const updateData = filterUpdateData(data);
  
  const documentfound = await Document.findOne({ projectId });
  if (!documentfound) {
    throw new Error("DOCUMENT_NOT_FOUND");
  }

  const contract = documentfound.contracts.id(contractId);
  if (!contract) {
    throw new Error("CONTRACT_NOT_FOUND");
  }

  const policy = contract.policies.id(policyId);
  if (!policy) {
    throw new Error("POLICY_NOT_FOUND");
  }

  Object.assign(policy, updateData);
  contract.markModified("policies");
  await documentfound.save();
  return documentfound.contracts.id(contractId)?.policies.id(policyId);
};

// ----- DELETE -----
export const deleteDocumentPhaseService = async (projectId: string) => {
  const document = await Document.findOneAndDelete({ projectId });
  if (!document) {
    throw new Error("DOCUMENT_NOT_FOUND");
  }
  return document;
};

export const deleteContractService = async (projectId: string, contractId: string) => {
  const document = await Document.findOne({ projectId });
  if (!document) {
    throw new Error("DOCUMENT_NOT_FOUND");
  }
  const contract = document.contracts.id(contractId);
  if (!contract) {
    throw new Error("CONTRACT_NOT_FOUND");
  }
  contract.deleteOne();
  await document.save();
  return document;
};

export const deletePolicyService = async (projectId: string, contractId: string, policyId: string) => {
  const document = await Document.findOne({ projectId });
  if (!document) {
    throw new Error("DOCUMENT_NOT_FOUND");
  }
  const contract = document.contracts.id(contractId);
  if (!contract) {
    throw new Error("CONTRACT_NOT_FOUND");
  }
  const policy = contract.policies.id(policyId);
  if (!policy) {
    throw new Error("POLICY_NOT_FOUND");
  }
  policy.deleteOne();
  await document.save();
  return document;
};