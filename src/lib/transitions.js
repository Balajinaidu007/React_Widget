export function sharpLeaving(theme) {
	return {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	};
}

export function easeOutEntering(theme) {
	return {
		easing: theme.transitions.easing.easeOut,
		duration: theme.transitions.duration.enteringScreen,
	};
}
