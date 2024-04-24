import { useCallback } from "react";
import { GAME_API_BASE_URL } from "../../lib/Constants";
import { SearchGamesResponse } from "../../lib/types";
import { useFetcher } from "../../lib/useFetcher";

const useSearchGames = () => {

    const { isLoading, error, sendRequest, clearError } = useFetcher<SearchGamesResponse>();

    const fetchSearchGames = useCallback(async (title: string | null, showDiscount: boolean, sortBy: string | null, pageNumber: number, pageSize: number, facets: string | null) => {

        return await sendRequest({
            url: `${GAME_API_BASE_URL}/search?title=${title}&discount=${showDiscount}&sortBy=${sortBy}&pageNumber=${pageNumber}&pageSize=${pageSize}&facets=${facets}`,
            options: {
                method: 'GET',
            },
        });

    }, []);

    return { isLoading, error, fetchSearchGames, clearError }
}

export default useSearchGames;
