import { Box } from '@mui/system';
import React from 'react';
import { RouteComponentProps, useLocation } from 'react-router';
import { STCPageLoadingBar } from '../../components/STCPageLoadingBar';
import { STCProductSpec } from '../../components/STCProductSpec';
import { useFetch } from '../../hooks/useFetch';
import { STCContainer } from '../../layout/STCContainer';
import { ProductSpec } from '../../types/product';
import { PaginatedListResponse } from '../../types/response';

export type STCProductListPageProps = RouteComponentProps;

export const STCProductListPage: React.FC<STCProductListPageProps> = props => {
	const location = useLocation();
	// category_name=xxx&category_level1=xxx&category_level2=xxx
	const params = new URLSearchParams(location.search);

	const { response: productSpecs, pending, error } = useFetch<PaginatedListResponse<ProductSpec>>(`/product_specs/?${params.toString()}`);

	return (
		<STCContainer>
			{pending === true && <STCPageLoadingBar />}

			{productSpecs === undefined ? (
				<>잠시만 기다려주세요...</>
			) : (
				<Box sx={{ '& > *': { marginTop: 4 } }}>
					{productSpecs.results.map(productSpec => (
						<STCProductSpec key={productSpec.id} productSpec={productSpec} />
					))}
				</Box>
			)}
		</STCContainer>
	);
};
