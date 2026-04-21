import { ContentHeader } from './ContentHeader';
import { NoStepActive } from './NoStepActive';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { head } from '@vertexvis/api-client-node';
import React from 'react';
import '@vertexvis/viewer';

import { useViewerContext } from '../contexts/viewer-context';

export function Parts({ onClose, onShow }) {
	const viewerContext = useViewerContext();
	const step = viewerContext.selectedInstructionStep;

	function NoContent() {
		return step == null ? (
			<NoStepActive />
		) : (
			<Typography sx={{ mb: 2 }}>No parts provided.</Typography>
		);
	}

	const stepNum = step?.step ? `Step ${step.step} ` : '';
	return (
		<>
			<ContentHeader onClose={onClose} title={`${stepNum} Parts`} />
			{step?.parts != null && step.parts.length > 0 ? (
				step?.parts.map((p, i) => (
					<Link
						color="inherit"
						key={i}
						onClick={() => onShow(p.name, p.sceneItemSuppliedIds)}
						sx={{
							alignItems: 'center',
							cursor: 'pointer',
							display: 'flex',
						}}
						underline="none"
					>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							alt={`Part revision thumbnail for scene item ${head(
								p.sceneItemSuppliedIds,
							)}`}
							height={120}
							src={`/${head(p.sceneItemSuppliedIds)}.png`}
						/>
						<Typography
							sx={{ mb: 2 }}
						>{`${p.name} x ${p.quantity}`}</Typography>
					</Link>
				))
			) : (
				<NoContent />
			)}
		</>
	);
}
