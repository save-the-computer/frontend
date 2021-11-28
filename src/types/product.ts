// categories[name][level1] = [level2, level2, level2 ...]
export type HierarchicalizedCategories = Record<
	// category.name
	string,
	Record<
		// category.level1
		string,
		// category.level2
		string[]
	>
>;

export interface ProductCategory {
	id: string;
	name: string;
	level1: string;
	level2: string;
}

export interface Product {
	id: string;
	variant: string;
	price: number | null;
	stock_state: '재고있음' | '일시품절' | '단종' | string;
	updated_at: string;
	product_spec: string;
}

export interface ProductSpec {
	id: string;
	category: ProductCategory;
	products: Product[];
	name: string;
	thumbnail: string | null;
	registration_date: string;
	updated_at: string;
}

export interface ProductPriceSeries {
	start: string;
	end: string;
	series: {
		price: Array<Product['price'] | null>;
		stock_state: Array<Product['stock_state'] | null>;
	};
}
