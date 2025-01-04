# WorkSend

A quick automation tool for my invoices

## `.env` file template

Here is a quick template for setting up the `.env` file:

```env
# .env

# Email Configuration
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
FROM_ADDRESS=billing@example.com

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_BUCKET_NAME=your_bucket_name
AWS_REGION=us-east-1

# Backup Configuration
BACKUP_LOCAL_PATH=./backups

# JIRA Configuration
JIRA_API_URL=https://your-jira-instance.atlassian.net
JIRA_API_TOKEN=your_jira_api_token
JIRA_PROJECT_KEY=YOURPROJECT

# Application
PORT=3000
```
