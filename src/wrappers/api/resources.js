import axiosImport from "axios";

export default resourcesBaseUrl => {
	const axios = axiosImport.create({
		baseURL: resourcesBaseUrl,
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		}
	});

	return {
		abns(lang) {
			return axios.get(`dpsData/${lang}/abnormals.json`);
		},

		skills(lang) {
			return axios.get(`dpsData/${lang}/skills.json`);
		},

		monsters(lang) {
			return axios.get(`dpsData/${lang}/monsters.json`);
		}
	};
};