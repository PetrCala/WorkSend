// src/app.ts
import express from "express"
import routes from "./routes"
import bodyParser from "body-parser"
import logger from "./utils/logger"

const app = express()

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use("/api", routes)

// Error handling middleware
app.use(
	(
		err: any,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		logger.error(`Unhandled error: ${err}`)
		res.status(500).json({ message: "Internal Server Error" })
	}
)

export default app
