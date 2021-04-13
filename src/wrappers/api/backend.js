import axiosImport from "axios";

export default backendBaseUrl => {
	const axios = axiosImport.create({
		baseURL: backendBaseUrl,
		timeout: 1000,
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		}
	});

	return {
		run(runId) {
			return axios.post("/v1/search/id", { runId: runId });
		},

		latest(region) {
			return axios.post("v1/search/latest", { region: region });
		},

		recent(query) {
			return axios.post("v1/search/recent", query);
		},
		top(query) {
			return axios.post("v1/search/top", query);
		},
		apiList() {
			return axios.get("api");
		}
	};
};