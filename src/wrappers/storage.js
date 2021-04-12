class LocalStorageWrapper {
	// eslint-disable-next-line no-empty-function
	constructor() { }

	set(keyName, value) {
		window.localStorage.setItem(`dpssitels__${keyName}`, JSON.stringify(value));
	}

	get(keyName) {
		let item = window.localStorage.getItem(`dpssitels__${keyName}`);
		
		if(!item) return undefined;
		else {
			try { return JSON.parse(item); }
			catch(error) {
				return undefined;
			}
		}
	}

	remove(name) {
		window.localStorage.removeItem(`dpssitels__${name}`);
	}
}

export default new LocalStorageWrapper();