import { Config } from '@lib/config';
import { VertexClient } from '@vertexvis/api-client-node';
import { createWriteStream } from 'fs';

export async function makeCall(apiCall) {
	try {
		const c = await getClient();
		return (await apiCall(c)).data;
	} catch (error) {
		const ve = error;
		return (
			ve.vertexError?.res ?? {
				errors: new Set([
					{ status: '500', title: 'Unknown error from Vertex API.' },
				]),
			}
		);
	}
}

let Client;
export async function getClient() {
	if (Client != null) return Client;

	Client = await VertexClient.build({
		basePath:
			Config.vertexEnv === 'platprod'
				? 'https://platform.vertexvis.com'
				: `https://platform.${Config.vertexEnv}.vertexvis.io`,
		client: {
			id: process.env.VERTEX_CLIENT_ID ?? '',
			secret: process.env.VERTEX_CLIENT_SECRET ?? '',
		},
	});

	return Client;
}

export function errorRes(message, res) {
	return Promise.resolve(res.status(400).json({ message }));
}

export function createFile(stream, path) {
	return new Promise((resolve) => {
		const ws = createWriteStream(path);
		stream.pipe(ws);
		ws.on('finish', resolve);
	});
}
