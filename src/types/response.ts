export type RetrieveResponse<Data> = Data;

export type ListResponse<Data> = Data[];

export type PaginatedListResponse<Data> = {
	count: number;
	next: string | null;
	previous: string | null;
	results: Data[];
};
