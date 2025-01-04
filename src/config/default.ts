// src/config/default.ts
export default {
	email: {
		smtpHost: process.env.SMTP_HOST || "smtp.example.com",
		smtpPort: Number(process.env.SMTP_PORT) || 587,
		smtpUser: process.env.SMTP_USER || "user@example.com",
		smtpPass: process.env.SMTP_PASS || "password",
		fromAddress: process.env.FROM_ADDRESS || "billing@example.com",
	},
	storage: {
		provider: process.env.STORAGE_PROVIDER || "aws",
		aws: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
			bucketName: process.env.AWS_BUCKET_NAME || "",
			region: process.env.AWS_REGION || "eu-central-1",
		},
		// Add other providers if needed
	},
	backup: {
		localPath: process.env.BACKUP_LOCAL_PATH || "./backups",
		// Or cloud backup configurations
	},
	jira: {
		apiUrl:
			process.env.JIRA_API_URL || "https://your-jira-instance.atlassian.net",
		apiToken: process.env.JIRA_API_TOKEN || "",
		projectKey: process.env.JIRA_PROJECT_KEY || "",
	},
	app: {
		port: Number(process.env.PORT) || 3000,
	},
}
