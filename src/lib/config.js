import { envVar } from './utils';

export const Config = {
	vertexEnv: envVar('VERTEX_ENV', 'platprod'),
};
