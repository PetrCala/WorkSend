// src/routes/index.ts
import { Router } from "express"
import invoiceController from "../controllers/invoiceController"

const router = Router()

// Example route to send an invoice
router.post("/send-invoice", async (req, res) => {
	const invoice = req.body // Validate and sanitize input in production
	try {
		await invoiceController.processInvoice(invoice)
		res.status(200).json({ message: "Invoice processed successfully" })
	} catch (error) {
		res.status(500).json({ message: "Failed to process invoice" })
	}
})

// Add more routes as needed

export default router
