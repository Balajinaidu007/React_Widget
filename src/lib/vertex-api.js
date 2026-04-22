// NOTE: This file is for Node.js/server-side use only
// For browser-based API calls, use fetch() directly or a backend proxy

import '@vertexvis/viewer';

// Stub implementations - these should not be called in browser environment
export async function makeCall(apiCall) {
	throw new Error('makeCall is not supported in browser environment. Use fetch() with backend proxy instead.');
}

export async function getClient() {
	throw new Error('getClient is not supported in browser environment. Use backend API instead.');
}

export function errorRes(message, res) {
	throw new Error('errorRes is not supported in browser environment.');
}

export function createFile(stream, path) {
	throw new Error('createFile is not supported in browser environment.');
}
