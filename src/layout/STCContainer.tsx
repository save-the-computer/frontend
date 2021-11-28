import { Container } from '@mui/material';
import React from 'react';

export const STCContainer: React.FC = props => {
	const { children } = props;

	return <Container maxWidth="lg">{children}</Container>;
};
