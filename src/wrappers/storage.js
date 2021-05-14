const prefix = "dpssitels__";

class LocalStorageWrapper {
	// eslint-disable-next-line no-empty-function
	constructor() { }

	set(keyName, value) {
		window.localStorage.setItem(`${prefix}${keyName}`, JSON.stringify(value));
	}

	get(keyName) {
		let item = window.localStorage.getItem(`${prefix}${keyName}`);
		
		if(!item) return undefined;
		else {
			try { return JSON.parse(item); }
			catch(error) {
				return undefined;
			}
		}
	}

	remove(name) {
		window.localStorage.removeItem(`${prefix}${name}`);
	}
}

export default new LocalStorageWrapper();