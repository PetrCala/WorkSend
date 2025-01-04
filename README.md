# WorkSend

A quick automation tool for my invoices

## `.env` file template

Here is a quick template for setting up the `.env` file:

```env
# ===============================
# Application Configuration
# ===============================
PORT=3000
NODE_ENV=development

# ===============================
# Email (SMTP) Configuration
# ===============================
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_user@example.com
SMTP_PASS=your_smtp_password
FROM_ADDRESS=billing@example.com

# ===============================
# AWS S3 Configuration (Cloud Storage)
# ===============================
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_BUCKET_NAME=your_s3_bucket_name
AWS_REGION=us-east-1

# ===============================
# Backup Configuration
# ===============================
BACKUP_LOCAL_PATH=./backups
# If using cloud backups, add relevant configurations below
# For example, another AWS S3 bucket for backups
BACKUP_AWS_BUCKET_NAME=your_backup_s3_bucket_name
BACKUP_AWS_REGION=us-east-1

# ===============================
# JIRA Integration Configuration
# ===============================
JIRA_API_URL=https://your-jira-instance.atlassian.net
JIRA_API_EMAIL=your_jira_email@example.com
JIRA_API_TOKEN=your_jira_api_token
JIRA_PROJECT_KEY=YOURPROJECTKEY

# ===============================
# Additional Configurations
# ===============================
# Add any other environment-specific variables below
# Example:
# LOG_LEVEL=info
# TIMEZONE=UTC

```
