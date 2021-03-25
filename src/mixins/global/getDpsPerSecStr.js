export default {
	methods: {
		formatStringAsDps(value) {
			if (!value) return value;
			let exponent = 0;
			let decimalValue = Number(value);
			let rounded;
			let suffix;
			while (Math.abs(rounded = Math.round(decimalValue)) >= 1000) {
				decimalValue /= 10;
				exponent++;
			}
			while (exponent % 3 != 0) {
				rounded *= 0.1;
				exponent++;
			}

			switch (exponent) {
				case 0:
					suffix = "";
					break;
				case 3:
					suffix = "k";
					break;
				case 6:
					suffix = "M";
					break;
				case 9:
					suffix = "B";
					break;
				default:
					suffix = `E+${exponent}`;
					break;
			}

			return `${rounded}${suffix}/s`
		}
	},
};