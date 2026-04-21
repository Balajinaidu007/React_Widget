import TextSnippetOutlined from '@mui/icons-material/TextSnippetOutlined';
import WidgetsOutlined from '@mui/icons-material/WidgetsOutlined';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import React from 'react';

export function InstructionSpeedDial({ onClick }) {
	const actions = [
		{
			icon: <TextSnippetOutlined />,
			name: 'Instructions',
			onClick: () => onClick('instructions'),
		},
		{
			icon: <WidgetsOutlined />,
			name: 'Parts List',
			onClick: () => onClick('parts'),
		},
	];

	return (
		<SpeedDial
			ariaLabel="Work instruction toolbar"
			direction="down"
			hidden={true}
			open={true}
			sx={{ mr: 2 }}
		>
			{actions.map((action) => (
				<SpeedDialAction
					key={action.name}
					icon={action.icon}
					onClick={() => action.onClick()}
					tooltipTitle={action.name}
				/>
			))}
		</SpeedDial>
	);
}
