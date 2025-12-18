'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllAuthorizations, deleteAuthorization, cloneAuthorization } from '@/lib/storage';
import { DisbursementAuthorization } from '@/lib/types';

export default function Dashboard() {
  const router = useRouter();
  const [authorizations, setAuthorizations] = useState<DisbursementAuthorization[]>([]);

  useEffect(() => {
    loadAuthorizations();
  }, []);

  const loadAuthorizations = () => {
    const data = getAllAuthorizations();
    setAuthorizations(data.sort((a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    ));
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this authorization?')) {
      deleteAuthorization(id);
      loadAuthorizations();
    }
  };

  const handleClone = (id: string) => {
    const cloned = cloneAuthorization(id);
    if (cloned) {
      loadAuthorizations();
      router.push(`/edit/${cloned.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Disbursement Authorizations
            </h1>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/settings')}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                ⚙️ Settings
              </button>
              <button
                onClick={() => router.push('/new')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                + New Authorization
              </button>
            </div>
          </div>

          {authorizations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No authorizations yet.</p>
              <button
                onClick={() => router.push('/new')}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create Your First Authorization
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {authorizations.map((auth) => (
                    <tr key={auth.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {auth.title || 'Untitled'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{auth.toOrderOf || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {auth.amount ? `$${auth.amount}` : '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(auth.updatedAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => router.push(`/view/${auth.id}`)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View PDF"
                          >
                            👁️ View
                          </button>
                          <button
                            onClick={() => router.push(`/edit/${auth.id}`)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleClone(auth.id)}
                            className="text-green-600 hover:text-green-900"
                            title="Clone"
                          >
                            📋 Clone
                          </button>
                          <button
                            onClick={() => handleDelete(auth.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
