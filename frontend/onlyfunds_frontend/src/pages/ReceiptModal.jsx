import React from 'react';
import './ReceiptModal.css';

const ReceiptModal = ({ receipt, onClose }) => {
  if (!receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a simple text receipt
    const receiptText = `
ONLYFUNDS - DONATION RECEIPT
================================

Receipt ID: ${receipt.receiptId}
Date: ${new Date(receipt.date).toLocaleString()}

Campaign: ${receipt.campaignTitle}
Donor: ${receipt.donorName}
Email: ${receipt.donorEmail}

Amount: ₱${receipt.amount.toFixed(2)}

Payment Method: ${receipt.paymentMethod}

Thank you for your generous donation!

This receipt serves as proof of your donation.
================================
    `;

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${receipt.receiptId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="receipt-modal-overlay" onClick={onClose}>
      <div className="receipt-modal" onClick={(e) => e.stopPropagation()}>
        <button className="receipt-close-btn" onClick={onClose}>×</button>
        
        <div className="receipt-content">
          <div className="receipt-header">
            <h1 className="receipt-logo">ONLY<span>FUNDS</span></h1>
            <h2>Donation Receipt</h2>
            <p className="receipt-thank-you">Thank you for your generous contribution!</p>
          </div>

          <div className="receipt-details">
            <div className="receipt-row">
              <span className="receipt-label">Receipt ID:</span>
              <span className="receipt-value">{receipt.receiptId}</span>
            </div>
            
            <div className="receipt-row">
              <span className="receipt-label">Date:</span>
              <span className="receipt-value">{new Date(receipt.date).toLocaleString()}</span>
            </div>

            <div className="receipt-divider"></div>

            <div className="receipt-row">
              <span className="receipt-label">Campaign:</span>
              <span className="receipt-value">{receipt.campaignTitle}</span>
            </div>

            <div className="receipt-row">
              <span className="receipt-label">Donor Name:</span>
              <span className="receipt-value">{receipt.donorName}</span>
            </div>

            <div className="receipt-row">
              <span className="receipt-label">Email:</span>
              <span className="receipt-value">{receipt.donorEmail}</span>
            </div>

            <div className="receipt-divider"></div>

            <div className="receipt-row receipt-amount">
              <span className="receipt-label">Donation Amount:</span>
              <span className="receipt-value">₱{receipt.amount.toFixed(2)}</span>
            </div>

            <div className="receipt-row">
              <span className="receipt-label">Payment Method:</span>
              <span className="receipt-value">{receipt.paymentMethod}</span>
            </div>
          </div>

          <div className="receipt-footer">
            <p>This receipt serves as proof of your donation to {receipt.campaignTitle}.</p>
            <p>Your contribution makes a real difference!</p>
          </div>

          <div className="receipt-actions">
            <button className="receipt-btn receipt-btn-secondary" onClick={handlePrint}>
              Print Receipt
            </button>
            <button className="receipt-btn receipt-btn-primary" onClick={handleDownload}>
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
