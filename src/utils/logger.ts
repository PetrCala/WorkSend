// src/utils/logger.ts
import { createLogger, format, transports } from "winston"

const logger = createLogger({
	level: "info",
	format: format.combine(
		format.timestamp({
			format: "YYYY-MM-DD HH:mm:ss",
		}),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
	defaultMeta: { service: "invoice-emailer" },
	transports: [
		new transports.File({ filename: "logs/error.log", level: "error" }),
		new transports.File({ filename: "logs/combined.log" }),
	],
})

// If not in production, log to console as well
if (process.env.NODE_ENV !== "production") {
	logger.add(
		new transports.Console({
			format: format.combine(format.colorize(), format.simple()),
		})
	)
}

export default logger