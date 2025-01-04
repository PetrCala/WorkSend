// src/server.ts
import app from "./app"
import config from "./config"
import logger from "./utils/logger"

app.listen(config.app.port, () => {
	logger.info(`Server is running on port ${config.app.port}`)
})
