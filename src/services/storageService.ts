// src/services/storageService.ts
import AWS from "aws-sdk"
import config from "../config"
import fs from "fs"
import path from "path"
import logger from "../utils/logger"

class StorageService {
	private s3: AWS.S3

	constructor() {
		if (config.storage.provider === "aws") {
			AWS.config.update({
				accessKeyId: config.storage.aws.accessKeyId,
				secretAccessKey: config.storage.aws.secretAccessKey,
				region: config.storage.aws.region,
			})
			this.s3 = new AWS.S3()
		}
		// Initialize other providers if needed
	}

	public async uploadInvoice(
		filePath: string,
		fileName: string
	): Promise<string> {
		if (config.storage.provider === "aws") {
			const fileContent = fs.readFileSync(filePath)
			const params = {
				Bucket: config.storage.aws.bucketName,
				Key: fileName,
				Body: fileContent,
			}

			try {
				const data = await this.s3.upload(params).promise()
				logger.info(`File uploaded successfully. ${data.Location}`)
				return data.Location
			} catch (error) {
				logger.error(`Error uploading file: ${error}`)
				throw error
			}
		}

		// Implement other providers
		throw new Error("Storage provider not supported")
	}

	// Add methods for downloading, deleting, etc., if needed
}

export default new StorageService()
