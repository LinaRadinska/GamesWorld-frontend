import { ApiError, SearchGamesResponse, GetGameByIdResponse, GetUpcomingGamesResponse } from "./types";
import { useFetch, UseFetchResult } from "./useFetcher";

const useGameApi = () => {

    const baseUrl = "http://localhost:5000/api/games";

    const getGame = (gameId: string): Promise<GetGameByIdResponse> => {
        return fetch(`${baseUrl}/${gameId}`)
            .then((response: Response) => {
                if (!response.ok) {
                    throw response.json() as Promise<ApiError>;
                }

                return response.json() as Promise<GetGameByIdResponse>;
            });
    }

    const searchGames = (title: string | null, showDiscount: boolean, sortBy: string | null, pageNumber: number, pageSize: number, facets: string | null): Promise<SearchGamesResponse> => {

        return fetch(`${baseUrl}/search?title=${title}&discount=${showDiscount}&sortBy=${sortBy}&pageNumber=${pageNumber}&pageSize=${pageSize}&facets=${facets}`)
            .then(response => response.json())
    }

    const useGetUpcomingGames = (): UseFetchResult<GetUpcomingGamesResponse> => {

        const { data, error, isLoading } = useFetch<GetUpcomingGamesResponse>({
            url: `${baseUrl}/upcoming`,
            options: {
                method: 'GET',
            },
        });

        return { data, error, isLoading }
    }

    return { getGame, searchGames, useGetUpcomingGames };
}

export default useGameApi;