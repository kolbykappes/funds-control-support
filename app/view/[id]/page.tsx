'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getAuthorizationById, getUserSettings } from '@/lib/storage';
import { DisbursementAuthorization } from '@/lib/types';
import PDFViewerComponent from '@/components/PDFViewerComponent';

export default function ViewPDFPage() {
  const params = useParams();
  const router = useRouter();
  const [authorization, setAuthorization] = useState<DisbursementAuthorization | null>(null);
  const [signature, setSignature] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    const data = getAuthorizationById(id);

    if (!data) {
      alert('Authorization not found');
      router.push('/');
      return;
    }

    const settings = getUserSettings();
    setAuthorization(data);
    setSignature(settings.signatureImage);
    setLoading(false);
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!authorization) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <PDFViewerComponent authorization={authorization} signature={signature} />
    </div>
  );
}
