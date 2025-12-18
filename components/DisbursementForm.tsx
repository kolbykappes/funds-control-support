'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DisbursementAuthorization, createEmptyAuthorization } from '@/lib/types';
import { saveAuthorization, getUserSettings, generateId } from '@/lib/storage';

interface DisbursementFormProps {
  initialData?: DisbursementAuthorization;
  isEdit?: boolean;
}

export default function DisbursementForm({ initialData, isEdit = false }: DisbursementFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<DisbursementAuthorization>(() => {
    if (initialData) return initialData;

    const empty = createEmptyAuthorization();
    const settings = getUserSettings();

    return {
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...empty,
      contractorName: settings.defaultContractorName || '',
      projectName: settings.defaultProjectName || '',
    };
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof DisbursementAuthorization] as any),
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      alert('Please enter a title for this authorization');
      return;
    }

    saveAuthorization(formData);
    router.push('/');
  };

  const handleSaveAndView = () => {
    if (!formData.title.trim()) {
      alert('Please enter a title for this authorization');
      return;
    }

    saveAuthorization(formData);
    router.push(`/view/${formData.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {isEdit ? 'Edit' : 'New'} Disbursement Authorization
        </h2>

        {/* Title (Internal) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title (for your reference) *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g., John Doe - January 2025"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Basic Information */}
      <div className="border-t pt-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Please Pay the Amount of:
            </label>
            <div className="flex items-center">
              <span className="mr-2">$</span>
              <input
                type="text"
                value={formData.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To the Order of:
            </label>
            <input
              type="text"
              value={formData.toOrderOf}
              onChange={(e) => handleChange('toOrderOf', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address of Payee:
          </label>
          <input
            type="text"
            value={formData.addressOfPayee}
            onChange={(e) => handleChange('addressOfPayee', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="finalPayment"
              checked={formData.finalPayment}
              onChange={(e) => handleChange('finalPayment', e.target.checked)}
              className="mr-2 h-4 w-4"
            />
            <label htmlFor="finalPayment" className="text-sm text-gray-700">
              Final Payment: Yes
            </label>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Executed lien release for the prior payment has been received and a copy forwarded to GHFS:
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="lienRelease"
                  checked={formData.lienReleaseReceived === 'yes'}
                  onChange={() => handleChange('lienReleaseReceived', 'yes')}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="lienRelease"
                  checked={formData.lienReleaseReceived === 'no'}
                  onChange={() => handleChange('lienReleaseReceived', 'no')}
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Subcontractor Section */}
      <div className="border-t pt-6 mb-6">
        <h3 className="text-lg font-semibold mb-2">
          IF PAYMENT IS TO A SUBCONTRACTOR, COMPLETE THIS SECTION
        </h3>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                A. Total Subcontract Amount from Projects Cost Breakdown
              </label>
              <div className="flex items-center">
                <span className="mr-2">$</span>
                <input
                  type="text"
                  value={formData.subcontractor.totalAmount}
                  onChange={(e) => handleNestedChange('subcontractor', 'totalAmount', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                B. Less Total of Previous Payment Requests
              </label>
              <div className="flex items-center">
                <span className="mr-2">$</span>
                <input
                  type="text"
                  value={formData.subcontractor.lessPreviousPayments}
                  onChange={(e) => handleNestedChange('subcontractor', 'lessPreviousPayments', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                C. Amount of This Request
              </label>
              <div className="flex items-center">
                <span className="mr-2">$</span>
                <input
                  type="text"
                  value={formData.subcontractor.thisRequestAmount}
                  onChange={(e) => handleNestedChange('subcontractor', 'thisRequestAmount', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                D. Balance to Pay
              </label>
              <div className="flex items-center">
                <span className="mr-2">$</span>
                <input
                  type="text"
                  value={formData.subcontractor.balanceToPay}
                  onChange={(e) => handleNestedChange('subcontractor', 'balanceToPay', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              E. Relevant Project Cost Breakdown Line Item Number
            </label>
            <input
              type="text"
              value={formData.subcontractor.lineItemNumber}
              onChange={(e) => handleNestedChange('subcontractor', 'lineItemNumber', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Supplier Section */}
      <div className="border-t pt-6 mb-6">
        <h3 className="text-lg font-semibold mb-2">
          IF PAYMENT IS TO A SUPPLIER, COMPLETE THIS SECTION
        </h3>

        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              1. Relevant Invoice Number(s): (Copies of invoices must be attached)
            </label>
            <input
              type="text"
              value={formData.supplier.invoiceNumbers}
              onChange={(e) => handleNestedChange('supplier', 'invoiceNumbers', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              2. Relevant Project Cost Breakdown Line Item Number:
            </label>
            <input
              type="text"
              value={formData.supplier.lineItemNumber}
              onChange={(e) => handleNestedChange('supplier', 'lineItemNumber', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Payment to You Section */}
      <div className="border-t pt-6 mb-6">
        <h3 className="text-lg font-semibold mb-2">
          IF PAYMENT IS TO YOU, COMPLETE THIS SECTION
        </h3>

        <div className="space-y-3">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="profit"
              checked={formData.paymentToYou.profit}
              onChange={(e) => handleNestedChange('paymentToYou', 'profit', e.target.checked)}
              className="mr-3 mt-1 h-4 w-4"
            />
            <label htmlFor="profit" className="text-sm text-gray-700">
              <div className="font-medium">PROFIT</div>
              <div className="text-gray-600">Indicate if payment to you is for your profit or overhead (no back-up documentation needed, but must be within percentage allowance)</div>
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="labor"
              checked={formData.paymentToYou.labor}
              onChange={(e) => handleNestedChange('paymentToYou', 'labor', e.target.checked)}
              className="mr-3 mt-1 h-4 w-4"
            />
            <label htmlFor="labor" className="text-sm text-gray-700">
              <div className="font-medium">LABOR</div>
              <div className="text-gray-600">Indicate if payment to you is for your labor costs (must attached labor report)</div>
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="materials"
              checked={formData.paymentToYou.materials}
              onChange={(e) => handleNestedChange('paymentToYou', 'materials', e.target.checked)}
              className="mr-3 mt-1 h-4 w-4"
            />
            <label htmlFor="materials" className="text-sm text-gray-700">
              <div className="font-medium">MATERIALS</div>
              <div className="text-gray-600">Indicate if payment to you is for materials out of your inventory</div>
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="reimbursement"
              checked={formData.paymentToYou.reimbursement}
              onChange={(e) => handleNestedChange('paymentToYou', 'reimbursement', e.target.checked)}
              className="mr-3 mt-1 h-4 w-4"
            />
            <label htmlFor="reimbursement" className="text-sm text-gray-700">
              <div className="font-medium">REIMBURSEMENT</div>
              <div className="text-gray-600">Indicate if payment to you is for reimbursement of amounts previously paid by you for valid project expenses. If so, indicate relevant Project: Cost Breakdown line item number (must attach back-up documentation and copy of check).</div>
            </label>
          </div>
        </div>
      </div>

      {/* Signature Section */}
      <div className="border-t pt-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Signature Section</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contractor:
            </label>
            <input
              type="text"
              value={formData.contractorName}
              onChange={(e) => handleChange('contractorName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date:
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Name:
          </label>
          <input
            type="text"
            value={formData.projectName}
            onChange={(e) => handleChange('projectName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6 border-t">
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save
        </button>
        <button
          onClick={handleSaveAndView}
          className="flex-1 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Save & View PDF
        </button>
      </div>
    </div>
  );
}
