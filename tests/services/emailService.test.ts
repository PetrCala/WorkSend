// tests/services/emailService.test.ts
import emailService from "../../src/services/emailService"
import { Invoice } from "../../src/models/invoice"
import nodemailer from "nodemailer"

jest.mock("nodemailer")

describe("EmailService", () => {
	it("should send an invoice email successfully", async () => {
		const sendMailMock = jest.fn().mockResolvedValue({})
		;(nodemailer.createTransport as jest.Mock).mockReturnValue({
			sendMail: sendMailMock,
		})

		const sampleInvoice: Invoice = {
			invoiceNumber: "INV-1002",
			clientName: "Jane Smith",
			clientEmail: "janesmith@example.com",
			invoiceDate: "2025-02-01",
			dueDate: "2025-02-15",
			items: [
				{
					description: "Service C",
					quantity: 3,
					unitPrice: 75.0,
					total: 225.0,
				},
			],
			totalAmount: 225.0,
			paymentInstructions: {
				bankAccount: "987654321",
				paypalEmail: "paypal@example.com",
			},
		}

		await emailService.sendInvoiceEmail(sampleInvoice)

		expect(nodemailer.createTransport).toHaveBeenCalled()
		expect(sendMailMock).toHaveBeenCalledWith(
			expect.objectContaining({
				to: "janesmith@example.com",
				subject: "Invoice INV-1002 from your_storage_provider", // Adjust based on config
				html: expect.any(String),
			})
		)
	})
})
