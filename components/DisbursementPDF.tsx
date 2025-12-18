import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { DisbursementAuthorization, UserSettings } from '@/lib/types';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 9,
    fontFamily: 'Helvetica',
  },
  header: {
    textAlign: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    textDecoration: 'underline',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  field: {
    flexDirection: 'row',
    flex: 1,
  },
  label: {
    fontSize: 8,
  },
  underline: {
    borderBottom: '1px solid black',
    flex: 1,
    marginLeft: 5,
    paddingBottom: 2,
  },
  value: {
    fontSize: 9,
  },
  sectionHeader: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 8,
    borderTop: '1.5px solid black',
    borderBottom: '1.5px solid black',
    paddingVertical: 3,
  },
  checkbox: {
    width: 10,
    height: 10,
    border: '1px solid black',
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    fontSize: 8,
  },
  subcontractorRow: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'center',
  },
  subcontractorLabel: {
    fontSize: 8,
    width: '70%',
  },
  dollarField: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  certification: {
    fontSize: 7,
    marginTop: 10,
    marginBottom: 10,
    lineHeight: 1.4,
  },
  signatureRow: {
    flexDirection: 'row',
    marginTop: 15,
  },
  signatureField: {
    flex: 1,
    marginRight: 10,
  },
  signatureLabel: {
    fontSize: 8,
    marginBottom: 3,
  },
  signatureLine: {
    borderBottom: '1px solid black',
    height: 30,
    position: 'relative',
  },
  signatureImage: {
    maxHeight: 28,
    objectFit: 'contain',
  },
  signatureText: {
    fontSize: 7,
    fontStyle: 'italic',
    marginTop: 2,
  },
  paymentSection: {
    marginBottom: 3,
  },
  paymentLabel: {
    fontSize: 8,
    marginLeft: 15,
  },
});

interface DisbursementPDFProps {
  data: DisbursementAuthorization;
  signature?: string;
}

export default function DisbursementPDF({ data, signature }: DisbursementPDFProps) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>EXHIBIT D</Text>
          <Text style={styles.subtitle}>DISBURSEMENT AUTHORIZATION</Text>
        </View>

        {/* Basic Information */}
        <View style={styles.row}>
          <View style={styles.field}>
            <Text style={styles.label}>Please Pay the Amount of:</Text>
            <View style={styles.underline}>
              <Text style={styles.value}>{data.amount}</Text>
            </View>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>To the Order of:</Text>
            <View style={styles.underline}>
              <Text style={styles.value}>{data.toOrderOf}</Text>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.field, { flex: 2 }]}>
            <Text style={styles.label}>Address of Payee:</Text>
            <View style={styles.underline}>
              <Text style={styles.value}>{data.addressOfPayee}</Text>
            </View>
          </View>
          <View style={[styles.field, { alignItems: 'center', justifyContent: 'flex-end' }]}>
            <Text style={styles.label}>Final Payment:</Text>
            <View style={styles.checkbox}>
              {data.finalPayment && <Text style={styles.checked}>X</Text>}
            </View>
            <Text style={styles.label}>Yes</Text>
          </View>
        </View>

        <View style={[styles.row, { alignItems: 'center' }]}>
          <Text style={[styles.label, { fontSize: 7, flex: 2 }]}>
            Executed lien release for the prior payment has been received and a copy forwarded to GHFS:
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
            <View style={styles.checkbox}>
              {data.lienReleaseReceived === 'yes' && <Text style={styles.checked}>X</Text>}
            </View>
            <Text style={styles.label}>Yes</Text>
            <View style={[styles.checkbox, { marginLeft: 15 }]}>
              {data.lienReleaseReceived === 'no' && <Text style={styles.checked}>X</Text>}
            </View>
            <Text style={styles.label}>No</Text>
          </View>
        </View>

        {/* Subcontractor Section */}
        <Text style={styles.sectionHeader}>IF PAYMENT IS TO A SUBCONTRACTOR, COMPLETE THIS SECTION</Text>

        <View style={styles.subcontractorRow}>
          <Text style={styles.subcontractorLabel}>A. Total Subcontract Amount from Projects Cost Breakdown</Text>
          <View style={styles.dollarField}>
            <Text style={styles.label}>$</Text>
            <View style={styles.underline}>
              <Text style={styles.value}>{data.subcontractor.totalAmount}</Text>
            </View>
          </View>
        </View>

        <View style={styles.subcontractorRow}>
          <Text style={styles.subcontractorLabel}>B. Less Total of Previous Payment Requests</Text>
          <View style={styles.dollarField}>
            <Text style={styles.label}>$</Text>
            <View style={styles.underline}>
              <Text style={styles.value}>{data.subcontractor.lessPreviousPayments}</Text>
            </View>
          </View>
        </View>

        <View style={styles.subcontractorRow}>
          <Text style={styles.subcontractorLabel}>C. Amount of This Request</Text>
          <View style={styles.dollarField}>
            <Text style={styles.label}>$</Text>
            <View style={styles.underline}>
              <Text style={styles.value}>{data.subcontractor.thisRequestAmount}</Text>
            </View>
          </View>
        </View>

        <View style={styles.subcontractorRow}>
          <Text style={styles.subcontractorLabel}>D. Balance to Pay</Text>
          <View style={styles.dollarField}>
            <Text style={styles.label}>$</Text>
            <View style={styles.underline}>
              <Text style={styles.value}>{data.subcontractor.balanceToPay}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.subcontractorRow, { marginBottom: 8 }]}>
          <Text style={[styles.subcontractorLabel, { width: '40%' }]}>E. Relevant Project Cost Breakdown</Text>
          <View style={[styles.field, { flex: 1 }]}>
            <Text style={styles.label}>Line Item Number</Text>
            <View style={styles.underline}>
              <Text style={styles.value}>{data.subcontractor.lineItemNumber}</Text>
            </View>
          </View>
        </View>

        {/* Supplier Section */}
        <Text style={styles.sectionHeader}>IF PAYMENT IS TO A SUPPLIER, COMPLETE THIS SECTION</Text>

        <View style={{ marginBottom: 5 }}>
          <Text style={[styles.label, { fontFamily: 'Helvetica-Bold', marginBottom: 3 }]}>
            INVOICE AND PROJECT INFORMATION
          </Text>
          <View style={[styles.row, { marginBottom: 3 }]}>
            <Text style={[styles.label, { width: 180 }]}>1. Relevant Invoice Number(s):</Text>
            <View style={styles.underline}>
              <Text style={styles.value}>{data.supplier.invoiceNumbers}</Text>
            </View>
          </View>
          <Text style={[styles.label, { fontSize: 7, marginLeft: 15, marginBottom: 3 }]}>
            (Copies of invoices must be attached)
          </Text>
          <View style={styles.row}>
            <Text style={[styles.label, { width: 180 }]}>2. Relevant Project Cost Breakdown</Text>
            <View style={[styles.field, { flex: 1 }]}>
              <Text style={styles.label}>Line Item Number:</Text>
              <View style={styles.underline}>
                <Text style={styles.value}>{data.supplier.lineItemNumber}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Payment to You Section */}
        <Text style={styles.sectionHeader}>IF PAYMENT IS TO YOU, COMPLETE THIS SECTION</Text>

        <View style={{ marginBottom: 8 }}>
          <View style={[styles.row, { marginBottom: 2, alignItems: 'flex-start' }]}>
            <Text style={[styles.label, { width: 20 }]}>1.</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>
                Indicate if payment to you is for your profit or overhead (no back-up documentation needed, but must be within percentage allowance)
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
              <View style={styles.checkbox}>
                {data.paymentToYou.profit && <Text style={styles.checked}>X</Text>}
              </View>
              <Text style={[styles.label, { fontFamily: 'Helvetica-Bold' }]}>PROFIT</Text>
            </View>
          </View>

          <View style={[styles.row, { marginBottom: 2, alignItems: 'flex-start' }]}>
            <Text style={[styles.label, { width: 20 }]}>2.</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>
                Indicate if payment to you is for your labor costs (must attached labor report)
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
              <View style={styles.checkbox}>
                {data.paymentToYou.labor && <Text style={styles.checked}>X</Text>}
              </View>
              <Text style={[styles.label, { fontFamily: 'Helvetica-Bold' }]}>LABOR</Text>
            </View>
          </View>

          <View style={[styles.paymentSection, { marginLeft: 15, marginBottom: 2 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.checkbox}>
                {data.paymentToYou.materials && <Text style={styles.checked}>X</Text>}
              </View>
              <Text style={[styles.label, { fontFamily: 'Helvetica-Bold', marginRight: 5 }]}>MATERIALS</Text>
              <Text style={styles.label}>Indicate if payment to you is for materials out of your inventory</Text>
            </View>
          </View>

          <View style={[styles.paymentSection, { marginLeft: 15 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <View style={[styles.checkbox, { marginTop: 2 }]}>
                {data.paymentToYou.reimbursement && <Text style={styles.checked}>X</Text>}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.label, { fontFamily: 'Helvetica-Bold' }]}>REIMBURSEMENT</Text>
                <Text style={[styles.label, { fontSize: 7 }]}>
                  Indicate if payment to you is for reimbursement of amounts previously paid by you for valid project expenses. If so, indicate relevant Project: Cost Breakdown line item number (must attach back-up documentation and copy of check).
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Certification */}
        <View style={{ borderTop: '1.5px solid black', paddingTop: 5 }}>
          <Text style={styles.certification}>
            The undersigned hereby certifies that the above work or services has been properly performed, materials have been properly delivered, stored and/or incorporated into the Project and these activities have been approved by the undersigned and by the owner's representative
          </Text>
        </View>

        {/* Signature Section */}
        <View style={styles.signatureRow}>
          <View style={styles.signatureField}>
            <Text style={styles.signatureLabel}>Contractor:</Text>
            <View style={styles.signatureLine}>
              <Text style={[styles.value, { paddingTop: 2 }]}>{data.contractorName}</Text>
            </View>
          </View>

          <View style={styles.signatureField}>
            <Text style={styles.signatureLabel}>Date:</Text>
            <View style={styles.signatureLine}>
              <Text style={[styles.value, { paddingTop: 2 }]}>{data.date}</Text>
            </View>
          </View>
        </View>

        <View style={styles.signatureRow}>
          <View style={styles.signatureField}>
            <Text style={styles.signatureLabel}>By:</Text>
            <View style={styles.signatureLine}>
              {signature && <Image src={signature} style={styles.signatureImage} />}
            </View>
            <Text style={styles.signatureText}>(Signature)</Text>
          </View>

          <View style={styles.signatureField}>
            <Text style={styles.signatureLabel}>Project Name:</Text>
            <View style={styles.signatureLine}>
              <Text style={[styles.value, { paddingTop: 2 }]}>{data.projectName}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
