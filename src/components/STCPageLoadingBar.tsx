import { LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export type STCPageLoadingBarProps = {
	show?: boolean;
	progress?: number;
};

export const STCPageLoadingBar: React.FC<STCPageLoadingBarProps> = props => {
	const { show = true, progress } = props;

	return (
		<Box display={show ? 'initial' : 'none'} position="absolute" top={0} left={0} right={0}>
			<LinearProgress color="secondary" value={progress} variant={progress === undefined ? 'indeterminate' : 'determinate'} />
		</Box>
	);
};
