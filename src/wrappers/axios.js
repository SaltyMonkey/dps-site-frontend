import config from "../appConfig"
import axios from "axios"

export default axios.create({
	baseURL: config.apiUrl,
	headers: {
		"Accept": "application/ json",
		"Content-Type": "application/json"
	}
})