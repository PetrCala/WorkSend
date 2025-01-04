// src/controllers/invoiceController.ts
import { Invoice } from "../models/invoice"
import storageService from "../services/storageService"
import backupService from "../services/backupService"
import jiraService from "../services/jiraService"
import emailController from "./emailController"
import logger from "../utils/logger"

export class InvoiceController {
	public async processInvoice(invoice: Invoice): Promise<void> {
		try {
			// 1. Send invoice via email
			await emailController.sendInvoice(invoice)

			// 2. Save invoice to cloud storage
			const fileName = `invoices/${invoice.invoiceNumber}.pdf` // Assuming you generate a PDF
			const filePath = `/path/to/generated/${invoice.invoiceNumber}.pdf`
			const fileUrl = await storageService.uploadInvoice(filePath, fileName)

			// 3. Backup the invoice file
			backupService.backupFile(filePath, `${invoice.invoiceNumber}.pdf`)

			// 4. Log to JIRA
			await jiraService.createIssue(
				`Invoice ${invoice.invoiceNumber} sent`,
				`Invoice sent to ${invoice.clientName}. Accessible at ${fileUrl}.`
			)

			logger.info(`Invoice ${invoice.invoiceNumber} processed successfully.`)
		} catch (error) {
			logger.error(
				`Failed to process invoice ${invoice.invoiceNumber}: ${error}`
			)
			// Optionally, handle retries or notifications
		}
	}

	// Add more invoice-related methods if needed
}

export default new InvoiceController()
