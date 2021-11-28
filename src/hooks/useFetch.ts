import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useFetch<Response>(path: string, config?: AxiosRequestConfig) {
	const [response, setResponse] = useState<Response>();
	const [pending, setPending] = useState(false);
	const [error, setError] = useState<AxiosError | undefined>();

	useEffect(() => {
		const fetch = async () => {
			try {
				setPending(true);
				// retrieve data from url
				const axiosResponse = await axios({ url: new URL(path, apiUrl).href, ...config });

				setPending(false);
				setResponse(axiosResponse.data);
			} catch (error) {
				if (axios.isAxiosError(error)) {
					setError(error);
				} else {
					throw error;
				}
			}
		};

		fetch();
	}, [path, config]);

	return { response, pending, error };
}
