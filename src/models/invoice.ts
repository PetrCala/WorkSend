// src/models/invoice.ts
export interface InvoiceItem {
	description: string
	quantity: number
	unitPrice: number
	total: number
}

export interface Invoice {
	invoiceNumber: string
	clientName: string
	clientEmail: string
	invoiceDate: string // ISO Date string
	dueDate: string // ISO Date string
	items: InvoiceItem[]
	totalAmount: number
	paymentInstructions: PaymentInstructions
	// Add more fields as needed
}

export interface PaymentInstructions {
	bankAccount: string
	paypalEmail: string
	// Add more methods if needed
}
