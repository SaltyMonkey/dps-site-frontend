import axios from "axios"

export default function (apiUrl) {
	return axios.create({
		baseURL: apiUrl,
		headers: {
			"Accept": "application/ json",
			"Content-Type": "application/json"
		}

	})
}
