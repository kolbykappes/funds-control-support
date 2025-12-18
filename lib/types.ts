export interface DisbursementAuthorization {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;

  // Basic Information
  amount: string;
  toOrderOf: string;
  addressOfPayee: string;
  finalPayment: boolean;
  lienReleaseReceived: 'yes' | 'no' | '';

  // Subcontractor Section
  subcontractor: {
    totalAmount: string;
    lessPreviousPayments: string;
    thisRequestAmount: string;
    balanceToPay: string;
    lineItemNumber: string;
  };

  // Supplier Section
  supplier: {
    invoiceNumbers: string;
    lineItemNumber: string;
  };

  // Payment to You Section
  paymentToYou: {
    profit: boolean;
    labor: boolean;
    materials: boolean;
    reimbursement: boolean;
  };

  // Signature Section
  contractorName: string;
  date: string;
  projectName: string;
}

export interface BondRequest {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;

  // Header
  approved: boolean;
  declined: boolean;
  approvedBy: string;

  // Basic Information
  submitTo: string;
  contractor: string;
  contractorAddress: string;
  obligeeOfJob: string;
  obligeeAddress: string;
  jobDescription: string;

  // Bond Information
  bondType: 'bid' | 'performance' | 'payment' | 'form' | '';
  bidPercentage: string;
  copies: string;
  bidDate: string;
  contractDate: string;
  bondDate: string;
  estimatedContractAmt: string;
  contractBondAmt: string;
  completionTime: string;
  penalty: string;
  maintenancePeriod: string;

  // Architect
  architectName: string;
  architectAddress: string;

  // Delivery
  deliveryMethod: 'regular' | 'overnight' | 'pickup' | '';
  upsFedExNumber: string;

  // Comments
  comments: string;
}

export interface UserSettings {
  signatureImage: string; // base64 encoded image
  defaultContractorName: string;
  defaultProjectName: string;
}

export const createEmptyAuthorization = (): Omit<DisbursementAuthorization, 'id' | 'createdAt' | 'updatedAt'> => ({
  title: '',
  amount: '',
  toOrderOf: '',
  addressOfPayee: '',
  finalPayment: false,
  lienReleaseReceived: '',
  subcontractor: {
    totalAmount: '',
    lessPreviousPayments: '',
    thisRequestAmount: '',
    balanceToPay: '',
    lineItemNumber: '',
  },
  supplier: {
    invoiceNumbers: '',
    lineItemNumber: '',
  },
  paymentToYou: {
    profit: false,
    labor: false,
    materials: false,
    reimbursement: false,
  },
  contractorName: '',
  date: new Date().toISOString().split('T')[0],
  projectName: '',
});

export const createEmptyBondRequest = (): Omit<BondRequest, 'id' | 'createdAt' | 'updatedAt'> => ({
  title: '',
  approved: false,
  declined: false,
  approvedBy: '',
  submitTo: '',
  contractor: '',
  contractorAddress: '',
  obligeeOfJob: '',
  obligeeAddress: '',
  jobDescription: '',
  bondType: '',
  bidPercentage: '',
  copies: '',
  bidDate: '',
  contractDate: '',
  bondDate: '',
  estimatedContractAmt: '',
  contractBondAmt: '',
  completionTime: '',
  penalty: '',
  maintenancePeriod: '',
  architectName: '',
  architectAddress: '',
  deliveryMethod: '',
  upsFedExNumber: '',
  comments: '',
});
