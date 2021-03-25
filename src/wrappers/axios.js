import axios from "axios"

export default function (apiUrl, filesUrl) {
	return {
		api: axios.create({
			baseURL: apiUrl,
			headers: {
				"Accept": "application/ json",
				"Content-Type": "application/json"
			}

		}),
		files: axios.create({
			baseURL: filesUrl,
			headers: {
				"Accept": "application/ json",
				"Content-Type": "application/json"
			}

		})
	}
}