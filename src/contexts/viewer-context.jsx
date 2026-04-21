import React, { createContext, useContext, useState } from 'react';

export const ViewerContext = createContext(null);

export function ViewerContextProvider({ children }) {
	const [streamKey, setStreamKey] = useState(null);
	const [selectedInstructionStep, setSelectedInstructionStep] = useState(null);
	const [workInstructions, setWorkInstructions] = useState(null);

	return (
		<ViewerContext.Provider
			value={{
				streamKey,
				setStreamKey,
				selectedInstructionStep,
				setSelectedInstructionStep,
				workInstructions,
				setWorkInstructions,
			}}
		>
			{children}
		</ViewerContext.Provider>
	);
}

export function useViewerContext() {
	const context = useContext(ViewerContext);
	if (!context) {
		throw new Error(
			'Viewer context should be used within ViewerContextProvider',
		);
	}
	return context;
}
