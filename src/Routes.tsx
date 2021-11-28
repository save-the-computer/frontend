import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { STCProductPage } from './page/STCProductPage';
import { STCTaskResultPage } from './page/STCTaskResultPage';

export const Routes: React.FC = props => {
	return (
		<Switch>
			<Route exact path="/task_results" component={STCTaskResultPage} />
			<Route path="/products" component={STCProductPage} />

			<Route path="*">
				<Redirect to="/products" />
			</Route>
		</Switch>
	);
};
