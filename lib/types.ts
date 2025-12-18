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
