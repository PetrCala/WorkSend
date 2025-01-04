// src/controllers/emailController.ts
import emailService from "../services/emailService"
import { Invoice } from "../models/invoice"

export class EmailController {
	public async sendInvoice(invoice: Invoice): Promise<void> {
		await emailService.sendInvoiceEmail(invoice)
	}

	// Add more email-related methods if needed
}

export default new EmailController()
