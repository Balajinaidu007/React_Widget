import { blue, orange } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import '@vertexvis/viewer';

export default createTheme({
	palette: {
		primary: { main: blue[500] },
		secondary: { main: orange[500] },
	},
});
