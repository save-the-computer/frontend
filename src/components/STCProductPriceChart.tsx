import { purple } from '@mui/material/colors';
import { format } from 'date-fns';
import React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useFetch } from '../hooks/useFetch';
import { Product, ProductPriceSeries } from '../types/product';
import { RetrieveResponse } from '../types/response';
import { toCurrencyString } from '../utils/currency';

type PricePoint = {
	time: Date;
	price: Product['price'];
	stockState: Product['stock_state'];
};

export type STCProductPriceChartProps = {
	product: Product;
	range?: '7d' | '1mo' | '6mo' | '1y' | '5y';
};

export const STCProductPriceChart: React.FC<STCProductPriceChartProps> = props => {
	const { product, range = '7d' } = props;

	const {
		response: productPriceSeries,
		pending,
		error,
	} = useFetch<RetrieveResponse<ProductPriceSeries>>(`/product_price_series/${product.id}/?range=${range}`);

	if (productPriceSeries === undefined) return <>로딩중</>;

	const start = new Date(productPriceSeries.start).valueOf();
	const end = new Date(productPriceSeries.end).valueOf();

	const length = productPriceSeries.series.price.length;

	const data: PricePoint[] = productPriceSeries.series.price.map((price, index) => ({
		time: new Date(start + ((end - start) / (length - 1)) * index), // interpolation
		price,
		stockState: productPriceSeries.series.stock_state[index] ?? '알 수 없음',
	}));

	return (
		<ResponsiveContainer width="100%" height={400}>
			<LineChart data={data}>
				<XAxis dataKey="time" tickFormatter={date => format(date, 'MM/dd')} axisLine={false} />
				<YAxis tickFormatter={price => toCurrencyString(price)} mirror={true} domain={['dataMin', 'dataMax']} />
				<Tooltip isAnimationActive={false} />

				<Line type="monotone" dataKey="price" stroke={purple[700]} strokeWidth={4} dot={false} />
			</LineChart>
		</ResponsiveContainer>
	);
};
