import { Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useHistory } from 'react-router';
import { ProductSpec } from '../types/product';
import { toCurrencyString } from '../utils/currency';
import { STCProductThumbnail } from './STCProductThumbnail';

export type STCProductSpecProps = {
	productSpec: ProductSpec;
};

export const STCProductSpec: React.FC<STCProductSpecProps> = props => {
	const { productSpec } = props;
	const history = useHistory();

	return (
		<Box sx={{ display: 'flex', bgcolor: 'background.paper', padding: 2 }}>
			<STCProductThumbnail width={100} height={100} src={productSpec.thumbnail} />

			<Box sx={{ marginLeft: 4 }}>
				{productSpec.products.length === 0 ? (
					`${productSpec.name} (품절)`
				) : (
					<Link
						variant="h6"
						sx={{ color: 'black', '&:hover': { cursor: 'pointer' } }}
						underline="hover"
						onClick={() => history.push(`/products/${productSpec.id}`)}>
						{productSpec.name}
					</Link>
				)}
			</Box>

			<Box sx={{ marginLeft: 'auto' }} />

			<Box sx={{ width: 240, '& > *:not(:first-child)': { marginTop: 0.5 } }}>
				{productSpec.products.map(product => (
					<Box key={product.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<Typography>{product.variant}</Typography>
						<Typography>
							{product.stock_state === '재고있음' && product.price !== null
								? toCurrencyString(product.price)
								: product.stock_state}
						</Typography>
					</Box>
				))}
			</Box>
		</Box>
	);
};
