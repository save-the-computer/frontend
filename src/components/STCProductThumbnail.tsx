import { ImageNotSupported } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import React from 'react';

export type STCProductThumbnailProps = {
	src: string | null;
	width: string | number;
	height: string | number;
};

export const STCProductThumbnail: React.FC<STCProductThumbnailProps> = props => {
	const { src, width, height } = props;

	return src === null ? (
		<Box sx={{ width, height, background: grey[500], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<ImageNotSupported />
		</Box>
	) : (
		<Box sx={{ width, height }}>
			<img width="100%" height="100%" src={src} />
		</Box>
	);
};
