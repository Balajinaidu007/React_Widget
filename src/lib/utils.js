export function envVar(name, fallback) {
	const ev = process.env[name];
	return ev ?? fallback;
}

export function head(items) {
	return Array.isArray(items) ? items[0] : (items ?? undefined);
}
