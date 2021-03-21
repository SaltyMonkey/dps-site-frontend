class LocalStorageWrapper {
	constructor() { }

	set(name, value) {
		window.localStorage.setItem(`dpssitels__${name}`, JSON.stringify(value));
		console.log("trigger set")
	}

	get(name) {
		console.log("trigger get")
		let item = window.localStorage.getItem(`dpssitels__${name}`);
		return JSON.parse(item) || undefined;
		
	}

	remove(name) {
		window.localStorage.removeItem(`dpssitels__${name}`);
	}
}

export default new LocalStorageWrapper();