export function formatCurrency(value, currency = 'VND', locale = 'vi-VN') {
	try {
		return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
	} catch {
		return `${value} ${currency}`;
	}
}

export function debounce(fn, delay = 300) {
	let t = null;
	return (...args) => {
		clearTimeout(t);
		t = setTimeout(() => fn(...args), delay);
	};
}


