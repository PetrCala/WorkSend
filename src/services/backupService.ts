// src/services/backupService.ts
import fs from "fs"
import path from "path"
import config from "../config"
import logger from "../utils/logger"

class BackupService {
	public backupFile(sourcePath: string, backupName: string): void {
		try {
			const backupPath = path.join(config.backup.localPath, backupName)
			fs.copyFileSync(sourcePath, backupPath)
			logger.info(`File backed up to ${backupPath}`)
		} catch (error) {
			logger.error(`Failed to backup file: ${error}`)
			throw error
		}
	}

	// Implement cloud backups if needed
}

export default new BackupService()
