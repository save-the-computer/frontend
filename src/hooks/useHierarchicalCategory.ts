import { HierarchicalizedCategories, ProductCategory } from '../types/product';
import { ListResponse } from '../types/response';
import { useFetch } from './useFetch';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useHierarchicalCategory() {
	const { response, pending, error } = useFetch<ListResponse<ProductCategory>>('/categories/');

	if (response === undefined) return { response, pending, error };

	const categories = response;
	const hierarchicalizedCategories: HierarchicalizedCategories = {};

	for (const category of categories) {
		const { name, level1, level2 } = category;

		const h = hierarchicalizedCategories;

		if (!(name in h)) {
			h[name] = {};
		}

		if (!(level1 in h[name])) {
			h[name][level1] = [];
		}

		h[name][level1].push(level2);
	}

	return { response: hierarchicalizedCategories, pending, error };
}
