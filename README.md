# Work Send

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-14.x-green.svg)
![TypeScript](https://img.shields.io/badge/typescript-4.x-blue.svg)

## Table of Contents

- [Work Send](#work-send)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
    - [Running the Server](#running-the-server)
    - [Sending an Invoice](#sending-an-invoice)
    - [Example Script](#example-script)
  - [Testing](#testing)
  - [Logging](#logging)
  - [Extending the Project](#extending-the-project)
    - [Implementing Scheduled Tasks](#implementing-scheduled-tasks)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)

## Overview

This is a lightweight _node.js_ based tool to help me automate sending my invoices. Built with extensibility in mind, the project also supports additional functionalities such as saving invoices to cloud storage, backing up files, and integrating with external APIs like JIRA for logging purposes.

## Features

- **Send Invoices via Email:** Generate and send professional HTML invoice emails to clients.
- **Cloud Storage Integration:** Save invoices securely to cloud storage providers like AWS S3.
- **File Backup:** Automatically back up invoice files locally or to another cloud service.
- **JIRA Integration:** Create and log issues in JIRA for tracking invoice-related activities.
- **Modular Architecture:** Easily extend the application with new features and integrations.
- **Configuration Management:** Manage settings through environment variables and configuration files.
- **Logging:** Comprehensive logging using Winston for monitoring and debugging.
- **Testing:** Unit and integration tests to ensure reliability and stability.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **[Node.js](https://nodejs.org/en/)** (v14.x or later)
- **[npm](https://www.npmjs.com/)** (v6.x or later)
- **[AWS Account](https://aws.amazon.com/)** (if using AWS S3 for storage)
- **[JIRA Account](https://www.atlassian.com/software/jira)** (for issue tracking)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/PetrCala/WorkSend.git
   cd WorkSend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

## Configuration

1. **Create a `.env` File**

   At the root of the project, create a `.env` file to store environment-specific variables. **Do not commit this file to version control.**

   ```env
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

2. **Update Configuration Files**

   - **`src/config/default.ts`**: Ensure default configurations align with your `.env` settings.

     ```typescript
     // src/config/default.ts
     export default {
       email: {
         smtpHost: process.env.SMTP_HOST || 'smtp.example.com',
         smtpPort: Number(process.env.SMTP_PORT) || 587,
         smtpUser: process.env.SMTP_USER || 'user@example.com',
         smtpPass: process.env.SMTP_PASS || 'password',
         fromAddress: process.env.FROM_ADDRESS || 'billing@example.com',
       },
       storage: {
         provider: process.env.STORAGE_PROVIDER || 'aws',
         aws: {
           accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
           secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
           bucketName: process.env.AWS_BUCKET_NAME || '',
           region: process.env.AWS_REGION || 'us-east-1',
         },
       },
       backup: {
         localPath: process.env.BACKUP_LOCAL_PATH || './backups',
       },
       jira: {
         apiUrl:
           process.env.JIRA_API_URL ||
           'https://your-jira-instance.atlassian.net',
         apiToken: process.env.JIRA_API_TOKEN || '',
         projectKey: process.env.JIRA_PROJECT_KEY || '',
       },
       app: {
         port: Number(process.env.PORT) || 3000,
       },
     };
     ```

## Usage

### Running the Server

Start the server in development mode using `nodemon`:

```bash
npm run dev
```

Or build and start the server:

```bash
npm run build
npm start
```

The server will run on the port specified in the `.env` file (default is `3000`).

### Sending an Invoice

The application exposes an API endpoint to send invoices. Here's how to use it:

1. **API Endpoint**

   ```http
   POST /api/send-invoice
   ```

2. **Request Body**

   Send a JSON payload adhering to the `Invoice` interface.

   ```json
   {
     "invoiceNumber": "INV-1001",
     "clientName": "John Doe",
     "clientEmail": "johndoe@example.com",
     "invoiceDate": "2025-01-01",
     "dueDate": "2025-01-15",
     "items": [
       {
         "description": "Service A",
         "quantity": 2,
         "unitPrice": 50.0,
         "total": 100.0
       },
       {
         "description": "Service B",
         "quantity": 1,
         "unitPrice": 150.0,
         "total": 150.0
       }
     ],
     "totalAmount": 250.0,
     "paymentInstructions": {
       "bankAccount": "123456789",
       "paypalEmail": "paypal@example.com"
     }
   }
   ```

3. **cURL Example**

   ```bash
   curl -X POST http://localhost:3000/api/send-invoice \
   -H "Content-Type: application/json" \
   -d '{
     "invoiceNumber": "INV-1001",
     "clientName": "John Doe",
     "clientEmail": "johndoe@example.com",
     "invoiceDate": "2025-01-01",
     "dueDate": "2025-01-15",
     "items": [
       {
         "description": "Service A",
         "quantity": 2,
         "unitPrice": 50.0,
         "total": 100.0
       },
       {
         "description": "Service B",
         "quantity": 1,
         "unitPrice": 150.0,
         "total": 150.0
       }
     ],
     "totalAmount": 250.0,
     "paymentInstructions": {
       "bankAccount": "123456789",
       "paypalEmail": "paypal@example.com"
     }
   }'
   ```

4. **Response**

   - **Success (200 OK)**

     ```json
     {
       "message": "Invoice processed successfully"
     }
     ```

   - **Error (500 Internal Server Error)**

     ```json
     {
       "message": "Failed to process invoice"
     }
     ```

### Example Script

Alternatively, you can create a script to send invoices programmatically.

1. **Create `sendInvoice.ts`**

   ```typescript
   // src/sendInvoice.ts
   import invoiceController from './controllers/invoiceController';
   import { Invoice } from './models/invoice';

   const sampleInvoice: Invoice = {
     invoiceNumber: 'INV-1002',
     clientName: 'Jane Smith',
     clientEmail: 'janesmith@example.com',
     invoiceDate: '2025-02-01',
     dueDate: '2025-02-15',
     items: [
       { description: 'Service C', quantity: 3, unitPrice: 75.0, total: 225.0 },
     ],
     totalAmount: 225.0,
     paymentInstructions: {
       bankAccount: '987654321',
       paypalEmail: 'paypal@example.com',
     },
   };

   invoiceController
     .processInvoice(sampleInvoice)
     .then(() => {
       console.log('Invoice processed successfully');
     })
     .catch((error) => {
       console.error('Error processing invoice:', error);
     });
   ```

2. **Run the Script**

   ```bash
   npx ts-node src/sendInvoice.ts
   ```

## Testing

You can run tests with `npm test`.

## Logging

Logging is handled using **Winston**, providing comprehensive logs for monitoring and debugging.

- **Log Files**

  - **Error Logs:** `logs/error.log`
  - **Combined Logs:** `logs/combined.log`

- **Console Logging**

  - Enabled in non-production environments for real-time feedback.

## Extending the Project

**Work Send** is designed with modularity and extensibility in mind. Here are some ways to extend its functionality:

### Implementing Scheduled Tasks

Use `node-cron` to schedule automated tasks like daily backups or sending invoice reminders.

1. **Install `node-cron`**

   ```bash
   npm install node-cron
   ```

2. **Set Up a Scheduled Task**

   ```typescript
   // src/scheduler.ts
   import cron from 'node-cron';
   import invoiceController from './controllers/invoiceController';
   import { Invoice } from './models/invoice';

   // Schedule to run every day at midnight
   cron.schedule('0 0 * * *', async () => {
     try {
       // Fetch invoices due today or any other logic
       const invoices: Invoice[] = []; // Replace with actual fetching logic
       for (const invoice of invoices) {
         await invoiceController.processInvoice(invoice);
       }
       console.log('Scheduled invoice processing completed.');
     } catch (error) {
       console.error('Error in scheduled task:', error);
     }
   });
   ```

3. **Import Scheduler in `server.ts`**

   ```typescript
   // src/server.ts
   import app from './app';
   import config from './config';
   import logger from './utils/logger';
   import './scheduler'; // Import the scheduler

   app.listen(config.app.port, () => {
     logger.info(`Server is running on port ${config.app.port}`);
   });
   ```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the Repository**

2. **Create a New Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add Your Feature"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a Pull Request**

Provide a clear description of your changes and the problem they solve.

## License

This project is licensed under the [GNU GENERAL PUBLIC LICENSE](LICENSE).

## Contact

For any questions or support, please contact:

- **Your Name**
- **Email:** cala.p@seznam.cz
- **GitHub:** [yourusername](https://github.com/PetrCala)
- **LinkedIn:** [Your LinkedIn](https://www.linkedin.com/in/petr-cala/)
