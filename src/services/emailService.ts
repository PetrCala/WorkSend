// src/services/emailService.ts
import nodemailer from "nodemailer"
import config from "../config"
import { Invoice } from "../models/invoice"
import { renderTemplate } from "../utils/templateRenderer"
import logger from "../utils/logger"

class EmailService {
	private transporter: nodemailer.Transporter

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: config.email.smtpHost,
			port: config.email.smtpPort,
			secure: config.email.smtpPort === 465, // true for 465, false for other ports
			auth: {
				user: config.email.smtpUser,
				pass: config.email.smtpPass,
			},
		})
	}

	public async sendInvoiceEmail(invoice: Invoice): Promise<void> {
		try {
			const htmlContent = await renderTemplate("invoiceTemplate.html", {
				...invoice,
				companyName: config.storage.provider, // Add other config variables as needed
				// Ensure all placeholders in the template are provided here
				// e.g., headerColor, companyEmail, etc.
			})

			const mailOptions: nodemailer.SendMailOptions = {
				from: config.email.fromAddress,
				to: invoice.clientEmail,
				subject: `Invoice ${invoice.invoiceNumber} from ${config.storage.provider}`,
				html: htmlContent,
				// attachments: [] // Add attachments if needed
			}

			await this.transporter.sendMail(mailOptions)
			logger.info(`Invoice email sent to ${invoice.clientEmail}`)
		} catch (error) {
			logger.error(`Failed to send invoice email: ${error}`)
			throw error
		}
	}
}

export default new EmailService()
