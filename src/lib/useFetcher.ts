import { useState, useEffect, useCallback, useRef } from 'react';
import ServerError from './serverError';

export interface UseFetcherProps {
    url: string;
    options?: RequestInit;
}

export interface UseFetcherResult<T> {
    isLoading: boolean;
    error: ServerError | null;
    sendRequest: ({ url, options }: UseFetcherProps) => Promise<T>;
    clearError: () => void
}

export const useFetcher = <T>(): UseFetcherResult<T> => {
    const [error, setError] = useState<ServerError | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const activeHttpRequests = useRef<AbortController[]>([]);

    const sendRequest = useCallback(async ({ url, options }: UseFetcherProps) => {
        
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);

        try {
            const response = await fetch(url, {
                ...options,
                signal: httpAbortCtrl.signal
            });

            const responseData = await response.json();

            activeHttpRequests.current = activeHttpRequests.current.filter(
                reqCtrl => reqCtrl !== httpAbortCtrl
            );

            if (!response.ok) {
                throw new ServerError(responseData.message, response.status)
            }

            setIsLoading(false);
            return responseData;

        } catch (err) {
            if (err instanceof ServerError) {
                setError(err);
                setIsLoading(false);
                throw err;
            }
        }

    }, []);

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        }
    }, []);


    return { isLoading, error, sendRequest, clearError };
};