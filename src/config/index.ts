// src/config/index.ts
import defaultConfig from "./default"
import dotenv from "dotenv"

dotenv.config()

const config = {
	...defaultConfig,
	// Override with environment-specific configurations if needed
}

export default config
