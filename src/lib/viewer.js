import { applyPolyfills, defineCustomElements } from '@vertexvis/viewer/loader';
import React from 'react';
import '@vertexvis/viewer';

export function useViewer() {
	const [isReady, setIsReady] = React.useState(false);
	const ref = React.useRef(null);

	React.useEffect(() => {
		const loadComponents = async () => {
			await applyPolyfills();
			await defineCustomElements();
			setIsReady(true);
		};

		void loadComponents();
	}, []);

	return { ref, isReady };
}
