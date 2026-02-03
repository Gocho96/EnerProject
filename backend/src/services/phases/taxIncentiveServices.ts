import { TaxIncentive } from "../../models/phases/taxIncentiveModel";
import { filterUpdateData } from "../../utils/filterUpdateData";
import { Types } from "mongoose";

// ----- CREATE -----
export const createTaxIncentivePhaseService = async (projectId: string) => {
  const phaseFound = await TaxIncentive.findOne({ projectId });
  if (phaseFound) return phaseFound;

  return await TaxIncentive.create({ projectId });
};

export const addApplicationItService = async (projectId: string, data: any) => {
  const taxIncentive = await TaxIncentive.findOne({ projectId });
  if (!taxIncentive) {
    throw new Error("TAX_INCENTIVE_NOT_FOUND");
  }

  const applicacionItFound = taxIncentive.applicationIt.some(
    (application) => application.applicationNumberIt === data.applicationNumberIt,
  );

  if (applicacionItFound) {
    throw new Error("APPLICATION_ALREADY_EXISTS");
  }

  taxIncentive.applicationIt.push(data);

  return await taxIncentive.save();
};

export const addBeneficiaryService = async (projectId: string, applicationItId: string, data: any) => {
  const taxIncentive = await TaxIncentive.findOne({
    projectId: new Types.ObjectId(projectId),
    "applicationIt._id": new Types.ObjectId(applicationItId),
  });

  if (!taxIncentive) {
    throw new Error("TAX_INCENTIVE_NOT_FOUND");
  }

  const applicationIt = taxIncentive.applicationIt.id(applicationItId);

  if (!applicationIt) {
    throw new Error("APPLICATION_NOT_FOUND");
  }

  applicationIt.beneficiaries.push(data);

  return await taxIncentive.save();
};

export const addPaymentService = async (projectId: string, applicationItId: string, data: any) => {
  const taxIncentive = await TaxIncentive.findOne({
    projectId: new Types.ObjectId(projectId),
    "applicationIt._id": new Types.ObjectId(applicationItId),
  });

  if (!taxIncentive) {
    throw new Error("TAX_INCENTIVE_NOT_FOUND");
  }

  const applicationIt = taxIncentive.applicationIt.id(applicationItId);

  if (!applicationIt) {
    throw new Error("APPLICATION_NOT_FOUND");
  }

  const payment = applicationIt.payments.some(
    (pay) => pay.paymentNumber === data.paymentNumber,
  );

  if (payment) {
    throw new Error("PAYMENT_ALREADY_EXISTS");
  }

  applicationIt.payments.push(data);

  return await taxIncentive.save();
};

// ----- READ -----
export const getAllTaxIncentivesService = async () => {
  return await TaxIncentive.find().sort({ createdAt: -1 });
};

export const getAllApplicationsItService = async () => {
  const taxIncentiveFound = await TaxIncentive.find();
  const allApplications = taxIncentiveFound.flatMap((taxIncentive) =>
    taxIncentive.applicationIt.map((application) => ({
      ...application.toObject(),
      projectId: taxIncentive.projectId,
    })),
  );
  return allApplications;
};

export const getAllPaymentsService = async () => {
  const taxIncentivefound = await TaxIncentive.find();
  const allPayments = taxIncentivefound.flatMap((taxIncentive) =>
    taxIncentive.applicationIt.flatMap((application) =>
      application.payments.map((pay) => ({
        ...pay.toObject(),
        applicationId: application._id,
        projectId: taxIncentive.projectId,
      })),
    ),
  );
  return allPayments;
};

export const getTaxIncentiveService = async (projectId: string) => {
  const taxIncentiveFound = await TaxIncentive.findOne({ projectId });
  if (!taxIncentiveFound) {
    throw new Error("TAX_INCENTIVE_NOT_FOUND");
  }
  return taxIncentiveFound;
};

export const getApplicationItService = async (projectId: string, applicationItId: string) => {
  const taxIncentiveFound = await TaxIncentive.findOne({ projectId });

  if (!taxIncentiveFound) {
    throw new Error("TAX_INCENTIVE_NOT_FOUND");
  }

  const application = taxIncentiveFound.applicationIt.id(applicationItId);
  if (!application) {
    throw new Error("APPLICATION_NOT_FOUND");
  }
  return application;
};

export const getBeneficiaryService = async (projectId: string, applicationItId: string, beneficiaryId: string) => {
  const taxIncentiveFound = await TaxIncentive.findOne({ projectId });

  if (!taxIncentiveFound) {
    throw new Error("TAX_INCENTIVE_NOT_FOUND");
  }

  const applicationItFound = taxIncentiveFound.applicationIt.id(applicationItId);
  if (!applicationItFound) {
    throw new Error("APPLICATION_NOT_FOUND");
  }

  const beneficiary = applicationItFound.beneficiaries.id(beneficiaryId);
  if (!beneficiary) {
    throw new Error("BENEFICIARY_NOT_FOUND");
  }
  return beneficiary;
};

export const getPaymentService = async (projectId: string, applicationItId: string, paymentId: string) => {
  const taxIncentiveFound = await TaxIncentive.findOne({ projectId });

  if (!taxIncentiveFound) {
    throw new Error("TAX_INCENTIVE_NOT_FOUND");
  }

  const applicationItFound = taxIncentiveFound.applicationIt.id(applicationItId);
  if (!applicationItFound) {
    throw new Error("APPLICATION_NOT_FOUND");
  }

  const payment = applicationItFound.payments.id(paymentId);
  if (!payment) {
    throw new Error("PAYMENT_NOT_FOUND");
  }
  return payment;
};

// ----- UPDATE -----
export const updateApplicationItService = async (projectId: string, applicationItId: string, data: any) => {
  const updateData = filterUpdateData(data);

  const taxIncentiveUpdated = await TaxIncentive.findOne({ projectId });
  if (!taxIncentiveUpdated) {
    throw new Error("TAX_INCENTIVE_NOT_FOUND");
  }

  const applicationIt = taxIncentiveUpdated.applicationIt.id(applicationItId);
  if (!applicationIt) {
    throw new Error("APPLICATION_NOT_FOUND");
  }

  Object.assign(applicationIt, updateData);
  taxIncentiveUpdated.markModified("applicationIt");
  await taxIncentiveUpdated.save();
  return taxIncentiveUpdated.applicationIt.id(applicationItId);
};

export const updateBeneficiaryService = async (projectId: string, applicationItId: string, beneficiaryId: string, data: any, ) => {
  const updateData = filterUpdateData(data);
  
  const taxIncentiveUpdated = await TaxIncentive.findOne({ projectId });

  if (!taxIncentiveUpdated) {
    throw new Error("TAX_INCENTIVE_NOT_FOUND");
  }

  const applicationIt = taxIncentiveUpdated.applicationIt.id(applicationItId);
  if (!applicationIt) {
    throw new Error("APPLICATION_NOT_FOUND");
  }

  const beneficiary = applicationIt.beneficiaries.id(beneficiaryId);
  if (!beneficiary) {
    throw new Error("BENEFICIARY_NOT_FOUND");
  }

  Object.assign(beneficiary, updateData);
  applicationIt.markModified("beneficiaries");
  await taxIncentiveUpdated.save();
  return taxIncentiveUpdated.applicationIt.id(applicationItId)?.beneficiaries.id(beneficiaryId);
};

export const updatePaymentService = async (projectId: string, applicationItId: string, paymentId: string, data: any, ) => {
  const updateData = filterUpdateData(data);
  
  const taxIncentiveUpdated = await TaxIncentive.findOne({ projectId });

  if (!taxIncentiveUpdated) {
    throw new Error("TAX_INCENTIVE_NOT_FOUND");
  }

  const applicationIt = taxIncentiveUpdated.applicationIt.id(applicationItId);
  if (!applicationIt) {
    throw new Error("APPLICATION_NOT_FOUND");
  }

  const payment = applicationIt.payments.id(paymentId);
  if (!payment) {
    throw new Error("PAYMENT_NOT_FOUND");
  }

  Object.assign(payment, updateData);
  applicationIt.markModified("payments");
  await taxIncentiveUpdated.save();
  return taxIncentiveUpdated.applicationIt.id(applicationItId)?.payments.id(paymentId);
};

// ----- DELETE -----
export const deleteTaxIncentivePhaseService = async (projectId: string) => {
  const taxIncentiveDelete = await TaxIncentive.findOneAndDelete({ projectId });
  if (!taxIncentiveDelete) {
    throw new Error("TAX_INCENTIVE_NOT_FOUND");
  }
  return taxIncentiveDelete;
};

export const deleteApplicationItService = async (projectId: string, applicationItId: string) => {
  const taxIncentiveDelete = await TaxIncentive.findOne({ projectId });

  if (!taxIncentiveDelete) {
    throw new Error("TAX_INCENTIVE_NOT_FOUND");
  }
  const applicationIt = taxIncentiveDelete.applicationIt.id(applicationItId);

  if (!applicationIt) {
    throw new Error("APPLICATION_NOT_FOUND");
  }
  applicationIt.deleteOne();
  await taxIncentiveDelete.save();
  return taxIncentiveDelete;
};

export const deleteBeneficiaryService = async (projectId: string, applicationItId: string, beneficiaryId: string) => {
  const taxIncentiveDelete = await TaxIncentive.findOne({ projectId });
  if (!taxIncentiveDelete) {
    throw new Error("TAX_INCENTIVE_NOT_FOUND");
  }
  const applicationIt = taxIncentiveDelete.applicationIt.id(applicationItId);
  if (!applicationIt) {
    throw new Error("APPLICATION_NOT_FOUND");
  }
  const beneficiary = applicationIt.beneficiaries.id(beneficiaryId);
  if (!beneficiary) {
    throw new Error("BENEFICIARY_NOT_FOUND");
  }
  beneficiary.deleteOne();
  await taxIncentiveDelete.save();
  return taxIncentiveDelete;
};

export const deletePaymentService = async (projectId: string, applicationItId: string, paymentId: string) => {
  const taxIncentiveDelete = await TaxIncentive.findOne({ projectId });
  if (!taxIncentiveDelete) {
    throw new Error("TAX_INCENTIVE_NOT_FOUND");
  }
  const applicationIt = taxIncentiveDelete.applicationIt.id(applicationItId);
  if (!applicationIt) {
    throw new Error("APPLICATION_NOT_FOUND");
  }
  const payment = applicationIt.payments.id(paymentId);
  if (!payment) {
    throw new Error("PAYMENT_NOT_FOUND");
  }
  payment.deleteOne();
  await taxIncentiveDelete.save();
  return taxIncentiveDelete;
};