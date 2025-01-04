// src/utils/templateRenderer.ts
import fs from "fs"
import path from "path"
import handlebars from "handlebars"
import logger from "./logger"

export const renderTemplate = async (
	templateName: string,
	data: any
): Promise<string> => {
	try {
		const templatePath = path.join(__dirname, "..", "templates", templateName)
		const templateSource = fs.readFileSync(templatePath, "utf8")
		const template = handlebars.compile(templateSource)
		return template(data)
	} catch (error) {
		logger.error(`Failed to render template ${templateName}: ${error}`)
		throw error
	}
}
