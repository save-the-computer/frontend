import { Chip, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { STCPageLoadingBar } from '../../components/STCPageLoadingBar';
import { STCProductPriceChart } from '../../components/STCProductPriceChart';
import { STCProductThumbnail } from '../../components/STCProductThumbnail';
import { useFetch } from '../../hooks/useFetch';
import { STCContainer } from '../../layout/STCContainer';
import { Product, ProductSpec } from '../../types/product';
import { RetrieveResponse } from '../../types/response';
import { toCurrencyString } from '../../utils/currency';

export type STCProductDetailPageProps = RouteComponentProps<{ id: string }>;

export const STCProductDetailPage: React.FC<STCProductDetailPageProps> = props => {
	const {
		match: {
			params: { id },
		},
	} = props;

	const {
		response: productSpec,
		pending: productSpecPending,
		error: productSpecError,
	} = useFetch<RetrieveResponse<ProductSpec>>(`/product_specs/${id}/`);
	const defaultProduct = productSpec?.products.find(product => product.id === productSpec.id) ?? productSpec?.products[0];

	const [focusedProductId, setFocusedProductId] = useState(id);
	const [range, setRange] = useState<'7d' | '1mo' | '6mo' | '1y' | '5y'>('7d');

	const {
		response: product,
		pending: productPending,
		error: productError,
	} = useFetch<RetrieveResponse<Product>>(`/products/${focusedProductId}/`);

	return (
		<STCContainer>
			{productSpecPending === true || (productPending == true && <STCPageLoadingBar />)}

			{productSpec === undefined || defaultProduct === undefined ? (
				<>로딩중 ...</>
			) : (
				<>
					<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
						<STCProductThumbnail width={100} height={100} src={productSpec.thumbnail} />
						<Box marginLeft={2} />
						<Typography variant="h4">{productSpec.name}</Typography>
					</Box>

					<Box marginTop={4} />

					<Box sx={{ display: 'flex' }}>
						<Box sx={{ flex: 1, bgcolor: 'background.paper', padding: 2 }}>
							{product !== undefined && <STCProductPriceChart product={product} range={range} />}
						</Box>
						<Box marginLeft={6} />
						<Box sx={{ width: 260 }}>
							<Box sx={{ bgcolor: 'background.paper', padding: 2 }}>
								<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
									범위 선택
								</Typography>

								{(
									[
										{ value: '7d', label: '7일' },
										{ value: '1mo', label: '1달' },
										{ value: '6mo', label: '6달' },
										// { value: '1y', label: '1년' },
										// { value: '5y', label: '5년' },
									] as const
								).map(({ value, label }) => (
									<Chip
										variant={value === range ? 'filled' : 'outlined'}
										color="primary"
										key={value}
										label={label}
										size="small"
										onClick={() => setRange(value)}
										sx={{ marginTop: 1, marginRight: 1 }}
									/>
								))}
							</Box>

							<Box marginTop={4} />

							<Box sx={{ bgcolor: 'background.paper', padding: 2 }}>
								<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
									제품 종류
								</Typography>

								<FormControl>
									<RadioGroup value={focusedProductId} onChange={event => setFocusedProductId(event.target.value)}>
										{productSpec.products.map(product => (
											<FormControlLabel
												key={product.id}
												value={product.id}
												control={<Radio />}
												disableTypography
												label={
													<Typography variant="body2">
														{product.stock_state === '재고있음' && product.price !== null
															? toCurrencyString(product.price)
															: product.stock_state}{' '}
														{product.variant?.length > 0 ? `(${product.variant})` : ''}
													</Typography>
												}
											/>
										))}
									</RadioGroup>
								</FormControl>
							</Box>
						</Box>
					</Box>
				</>
			)}
		</STCContainer>
	);
};
