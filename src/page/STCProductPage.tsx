import { Box, BoxProps } from '@mui/system';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { STCAppBar } from '../layout/STCAppBar';
import { STCFilteringBar } from '../layout/STCFilteringBar';
import { STCProductDetailPage } from './product/STCProductDetailPage';
import { STCProductListPage } from './product/STCProductListPage';

export type STCProductPageProps = BoxProps;

export const STCProductPage: React.FC<STCProductPageProps> = props => {
	const { ...BoxProps } = props;

	return (
		<Box {...BoxProps}>
			<STCAppBar />
			<STCFilteringBar />

			<Box sx={{ marginTop: 8 }} />

			<Switch>
				<Route exact path="/products" component={STCProductListPage} />
				<Route path="/products/:id" component={STCProductDetailPage} />

				<Route exact path="/">
					<Redirect to="/products" />
				</Route>

				<Route path="*">404 NOT FOUND</Route>
			</Switch>
		</Box>
	);
};
