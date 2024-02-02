import { ApiError, Game, GetGameByIdResponse, GetUpcomingGamesResponse } from "./types";
import { useFetch, UseFetchResult } from "./useFetcher";

const useGameApi = () => {

    //"http://localhost:5000/api/games"
    const baseUrl = "http://localhost:3030/data/games";

    const getGame = (gameId: string): Promise<GetGameByIdResponse> => {
        return fetch(`http://localhost:5000/api/games/${gameId}`)
            .then((response: Response) => {
                if (!response.ok) {
                    throw response.json() as Promise<ApiError>;
                }

                return response.json() as Promise<GetGameByIdResponse>;
            });
    }

    const searchGames = (title: string | null, showDiscount: boolean, sortBy: string | null, offset: string | null | number, pageSize: number): Promise<Game[]> => {

        let where = `where=title%20LIKE%20${JSON.stringify(title)}`;

        if (showDiscount) {
            where += "%20AND%20discount>0";
        }

        return fetch(`${baseUrl}?${where}&sortBy=${sortBy}&offset=${offset}&pageSize=${pageSize}`)
            .then(response => response.json())
    }

    const countGames = (title: string | null, showDiscount: boolean): Promise<number> => {

        let where = `where=title%20LIKE%20${JSON.stringify(title)}`;

        if (showDiscount) {
            where += "%20AND%20discount>0";
        }

        return fetch(`${baseUrl}?${where}&count`)
            .then(response => response.json())
    }

    const useGetUpcomingGames = (): UseFetchResult<GetUpcomingGamesResponse> => {

        const { data, error, isLoading } = useFetch<GetUpcomingGamesResponse>({
            url: 'http://localhost:5000/api/games/upcoming',
            options: {
                method: 'GET',
            },
        });

        return { data, error, isLoading }
    }

    return { getGame, searchGames, countGames, useGetUpcomingGames };
}

export default useGameApi;