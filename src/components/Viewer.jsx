/* @jsx jsx */ /** @jsxRuntime classic */
import { ArrowDown, ArrowUp } from './Arrow';
import { InstructionSpeedDial } from './InstructionSpeedDial';
import { ViewerSpeedDial } from './ViewerSpeedDial';
import { jsx } from '@emotion/react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import '@vertexvis/viewer';
import {
	VertexViewer,
	VertexViewerDomElement,
	VertexViewerDomGroup,
	VertexViewerDomRenderer,
	VertexViewerToolbar,
} from '@vertexvis/viewer-react';

import { useViewerContext } from '../contexts/viewer-context';

export const AnimationDurationMs = 1500;
export const Viewer = onTap(UnwrappedViewer);

function UnwrappedViewer({ onClick, viewer, ...props }) {
	const viewerContext = useViewerContext();

	const streamKey = viewerContext.streamKey;
	const instructionStep = viewerContext.selectedInstructionStep;

	const src = `urn:vertex:stream-key:${streamKey}`;
	console.log('Viewer rendered with streamKey', streamKey);
	return (
		<VertexViewer
			css={{ height: '100%', width: '100%' }}
			ref={viewer}
			src={src}
			{...props}
		>
			<VertexViewerToolbar placement="top-left">
				<Box sx={{ alignItems: 'center', display: 'flex', ml: 2, mt: 3 }}>
					<Link
						href="https://github.com/Vertexvis/work-instructions-demo"
						rel="noreferrer"
						style={{ alignSelf: 'center' }}
						target="_blank"
					>
						View on GitHub
					</Link>
				</Box>
			</VertexViewerToolbar>
			<VertexViewerToolbar placement="top-right">
				<InstructionSpeedDial onClick={onClick} />
			</VertexViewerToolbar>
			<VertexViewerToolbar placement="bottom-right">
				<ViewerSpeedDial onClick={onClick} viewer={viewer} />
			</VertexViewerToolbar>
			<VertexViewerDomRenderer>
				<VertexViewerDomGroup>
					{instructionStep?.doms?.map((a, i) => (
						<VertexViewerDomElement
							key={i}
							positionJson={JSON.stringify(a.position)}
							rotationJson={JSON.stringify(a.rotation)}
							billboardOff={true}
						>
							{a.type === 'down' ? <ArrowDown /> : <ArrowUp />}
						</VertexViewerDomElement>
					))}
				</VertexViewerDomGroup>
			</VertexViewerDomRenderer>
		</VertexViewer>
	);
}

function onTap(WrappedViewer) {
	return function Component({ viewer, onSelect, ...props }) {
		return (
			<WrappedViewer
				viewer={viewer}
				{...props}
				onTap={async (e) => {
					if (e.defaultPrevented) {
						return;
					}

					if (props.onTap) props.onTap(e);

					const scene = await viewer.current?.scene();
					const raycaster = scene?.raycaster();

					if (raycaster != null) {
						const res = await raycaster.hitItems(e.detail.position, {
							includeMetadata: true,
						});
						const hit = (res?.hits ?? [])[0];
						await onSelect(e.detail, hit);
					}
				}}
			/>
		);
	};
}
