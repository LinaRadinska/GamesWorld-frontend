import { useState, useEffect } from 'react';
import ServerError from './serverError';

interface UseFetchProps {
  url: string;
  options?: RequestInit;
}

export interface UseFetchResult<T> {
  data: T | null;
  error: ServerError | null;
  isLoading: boolean;
}

interface ApiError {
  message: string
}

export const useFetch = <T>({ url, options }: UseFetchProps): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ServerError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          const apiError = await response.json() as ApiError;
          throw new ServerError(`Request failed with status: ${response.status}`, response.status, apiError.message);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err as ServerError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, error, isLoading };
};