import { DisbursementAuthorization, BondRequest, UserSettings } from './types';

const AUTHORIZATIONS_KEY = 'disbursement_authorizations';
const BOND_REQUESTS_KEY = 'bond_requests';
const SETTINGS_KEY = 'user_settings';

// Authorizations
export const getAllAuthorizations = (): DisbursementAuthorization[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(AUTHORIZATIONS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getAuthorizationById = (id: string): DisbursementAuthorization | null => {
  const authorizations = getAllAuthorizations();
  return authorizations.find(auth => auth.id === id) || null;
};

export const saveAuthorization = (authorization: DisbursementAuthorization): void => {
  const authorizations = getAllAuthorizations();
  const existingIndex = authorizations.findIndex(auth => auth.id === authorization.id);

  if (existingIndex >= 0) {
    authorizations[existingIndex] = {
      ...authorization,
      updatedAt: new Date().toISOString(),
    };
  } else {
    authorizations.push({
      ...authorization,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  localStorage.setItem(AUTHORIZATIONS_KEY, JSON.stringify(authorizations));
};

export const deleteAuthorization = (id: string): void => {
  const authorizations = getAllAuthorizations();
  const filtered = authorizations.filter(auth => auth.id !== id);
  localStorage.setItem(AUTHORIZATIONS_KEY, JSON.stringify(filtered));
};

export const cloneAuthorization = (id: string): DisbursementAuthorization | null => {
  const original = getAuthorizationById(id);
  if (!original) return null;

  const clone: DisbursementAuthorization = {
    ...original,
    id: generateId(),
    title: `${original.title} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  saveAuthorization(clone);
  return clone;
};

// User Settings
export const getUserSettings = (): UserSettings => {
  if (typeof window === 'undefined') {
    return {
      signatureImage: '',
      defaultContractorName: '',
      defaultProjectName: '',
    };
  }
  const data = localStorage.getItem(SETTINGS_KEY);
  return data ? JSON.parse(data) : {
    signatureImage: '',
    defaultContractorName: '',
    defaultProjectName: '',
  };
};

export const saveUserSettings = (settings: UserSettings): void => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

// Bond Requests
export const getAllBondRequests = (): BondRequest[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(BOND_REQUESTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getBondRequestById = (id: string): BondRequest | null => {
  const requests = getAllBondRequests();
  return requests.find(req => req.id === id) || null;
};

export const saveBondRequest = (request: BondRequest): void => {
  const requests = getAllBondRequests();
  const existingIndex = requests.findIndex(req => req.id === request.id);

  if (existingIndex >= 0) {
    requests[existingIndex] = {
      ...request,
      updatedAt: new Date().toISOString(),
    };
  } else {
    requests.push({
      ...request,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  localStorage.setItem(BOND_REQUESTS_KEY, JSON.stringify(requests));
};

export const deleteBondRequest = (id: string): void => {
  const requests = getAllBondRequests();
  const filtered = requests.filter(req => req.id !== id);
  localStorage.setItem(BOND_REQUESTS_KEY, JSON.stringify(filtered));
};

export const cloneBondRequest = (id: string): BondRequest | null => {
  const original = getBondRequestById(id);
  if (!original) return null;

  const clone: BondRequest = {
    ...original,
    id: generateId(),
    title: `${original.title} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  saveBondRequest(clone);
  return clone;
};

// Utility
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
