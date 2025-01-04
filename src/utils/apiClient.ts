// src/utils/apiClient.ts
import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import logger from "./logger"

export class APIClient {
	private axiosInstance: AxiosInstance

	constructor(baseURL: string, config?: AxiosRequestConfig) {
		this.axiosInstance = axios.create({
			baseURL,
			...config,
		})
	}

	public async get<T>(url: string, params?: any): Promise<T> {
		try {
			const response = await this.axiosInstance.get<T>(url, { params })
			return response.data
		} catch (error) {
			logger.error(`GET request failed: ${error}`)
			throw error
		}
	}

	public async post<T>(url: string, data?: any): Promise<T> {
		try {
			const response = await this.axiosInstance.post<T>(url, data)
			return response.data
		} catch (error) {
			logger.error(`POST request failed: ${error}`)
			throw error
		}
	}

	// Add other HTTP methods as needed
}

export default APIClient
