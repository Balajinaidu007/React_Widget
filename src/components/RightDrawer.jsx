import { Instructions } from './Instructions';
import { BottomDrawerHeight, RightDrawerWidth } from './Layout';
import { Parts } from './Parts';
import Box from '@mui/material/Box';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import React from 'react';

export function RightDrawer({
	content,
	onBeginAssembly,
	onClose,
	open,
	onShow,
}) {
	if (content == null) return <></>;

	function Content() {
		if (content === 'instructions')
			return (
				<Instructions
					onBeginAssembly={onBeginAssembly}
					onClose={onClose}
					onShow={onShow}
				/>
			);
		return <Parts onClose={onClose} onShow={onShow} />;
	}

	return (
		<Drawer
			anchor="right"
			open={open}
			sx={{
				flexShrink: 0,
				width: RightDrawerWidth,
				[`& .${drawerClasses.paper}`]: {
					height: `calc(100% - ${BottomDrawerHeight}px)`,
					width: RightDrawerWidth,
				},
			}}
			variant="persistent"
		>
			<Box sx={{ p: 2 }}>
				<Content />
			</Box>
		</Drawer>
	);
}
