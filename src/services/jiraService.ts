// src/services/jiraService.ts
import axios from "axios"
import config from "../config"
import logger from "../utils/logger"

class JiraService {
	private axiosInstance = axios.create({
		baseURL: config.jira.apiUrl,
		auth: {
			username: "email@example.com", // Replace with your JIRA email
			password: config.jira.apiToken,
		},
	})

	public async createIssue(
		summary: string,
		description: string
	): Promise<void> {
		const payload = {
			fields: {
				project: {
					key: config.jira.projectKey,
				},
				summary,
				description,
				issuetype: {
					name: "Task",
				},
			},
		}

		try {
			const response = await this.axiosInstance.post(
				"/rest/api/2/issue",
				payload
			)
			logger.info(`JIRA issue created: ${response.data.key}`)
		} catch (error) {
			logger.error(`Failed to create JIRA issue: ${error}`)
			throw error
		}
	}

	// Add more methods as needed (e.g., fetch issues, update issues)
}

export default new JiraService()
