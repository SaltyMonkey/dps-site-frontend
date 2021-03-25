export default {
	methods: {
		formatStringAsTimeSpan(value) {
			if (!value) return value;
			let seconds = Number(value);

			const mins = Math.floor(seconds / 60);
			const secs = mins > 0 ? (seconds - (mins * 60)) : seconds; 

			return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
		}
	},
};