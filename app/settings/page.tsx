'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserSettings, saveUserSettings } from '@/lib/storage';
import { UserSettings } from '@/lib/types';
import Image from 'next/image';

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<UserSettings>({
    signatureImage: '',
    defaultContractorName: '',
    defaultProjectName: '',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loadedSettings = getUserSettings();
    setSettings(loadedSettings);
  }, []);

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings(prev => ({
          ...prev,
          signatureImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    saveUserSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <button
              onClick={() => router.push('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back to Dashboard
            </button>
          </div>

          <div className="space-y-6">
            {/* Signature Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Signature Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleSignatureUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {settings.signatureImage && (
                <div className="mt-4 p-4 bg-gray-50 rounded border">
                  <p className="text-sm text-gray-600 mb-2">Current Signature:</p>
                  <div className="relative h-20 bg-white border rounded p-2">
                    <Image
                      src={settings.signatureImage}
                      alt="Signature"
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Default Contractor Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Contractor Name
              </label>
              <input
                type="text"
                value={settings.defaultContractorName}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  defaultContractorName: e.target.value,
                }))}
                placeholder="Your company name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Default Project Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Project Name
              </label>
              <input
                type="text"
                value={settings.defaultProjectName}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  defaultProjectName: e.target.value,
                }))}
                placeholder="Your default project name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Save Button */}
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Settings
              </button>
            </div>

            {saved && (
              <div className="p-3 bg-green-50 border border-green-200 rounded text-green-800 text-sm">
                ✓ Settings saved successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
