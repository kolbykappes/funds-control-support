'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DisbursementAuthorization } from '@/lib/types';

interface PDFViewerComponentProps {
  authorization: DisbursementAuthorization;
  signature: string;
}

export default function PDFViewerComponent({ authorization, signature }: PDFViewerComponentProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [PDFViewer, setPDFViewer] = useState<any>(null);
  const [PDFDownloadLink, setPDFDownloadLink] = useState<any>(null);
  const [DisbursementPDF, setDisbursementPDF] = useState<any>(null);

  useEffect(() => {
    setMounted(true);

    // Dynamically import PDF components only on client side
    Promise.all([
      import('@react-pdf/renderer'),
      import('@/components/DisbursementPDF')
    ]).then(([pdfModule, pdfDocModule]) => {
      setPDFViewer(() => pdfModule.PDFViewer);
      setPDFDownloadLink(() => pdfModule.PDFDownloadLink);
      setDisbursementPDF(() => pdfDocModule.default);
    });
  }, []);

  if (!mounted || !PDFViewer || !PDFDownloadLink || !DisbursementPDF) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-600">Loading PDF viewer...</div>
          </div>
        </div>
      </div>
    );
  }

  const fileName = `Disbursement_${authorization.title.replace(/\s+/g, '_')}_${authorization.date}.pdf`;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6 mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {authorization.title}
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => router.push(`/edit/${authorization.id}`)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Edit
            </button>
            <PDFDownloadLink
              document={<DisbursementPDF data={authorization} signature={signature} />}
              fileName={fileName}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {({ loading }: { loading: boolean }) => (loading ? 'Preparing...' : 'Download PDF')}
            </PDFDownloadLink>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Back
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4" style={{ height: 'calc(100vh - 200px)' }}>
        <PDFViewer width="100%" height="100%">
          <DisbursementPDF data={authorization} signature={signature} />
        </PDFViewer>
      </div>
    </div>
  );
}
