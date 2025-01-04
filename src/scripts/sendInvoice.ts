// Example script to send an invoice
import invoiceController from '../controllers/invoiceController';
import { Invoice } from '../models/invoice';

const sampleInvoice: Invoice = {
  invoiceNumber: 'INV-1001',
  clientName: 'John Doe',
  clientEmail: 'johndoe@example.com',
  invoiceDate: '2025-01-01',
  dueDate: '2025-01-15',
  items: [
    { description: 'Service A', quantity: 2, unitPrice: 50.0, total: 100.0 },
    { description: 'Service B', quantity: 1, unitPrice: 150.0, total: 150.0 },
  ],
  totalAmount: 250.0,
  paymentInstructions: {
    bankAccount: '123456789',
    paypalEmail: 'paypal@example.com',
  },
};

invoiceController
  .processInvoice(sampleInvoice)
  .then(() => {
    console.log('Invoice processed successfully');
  })
  .catch((error) => {
    console.error('Error processing invoice:', error);
  });
