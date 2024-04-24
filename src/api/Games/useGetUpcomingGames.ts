import { useCallback } from "react";
import { GAME_API_BASE_URL } from "../../lib/Constants";
import { GetUpcomingGamesResponse } from "../../lib/types";
import { useFetcher } from "../../lib/useFetcher";

const useGetUpcomingGames = () => {
    
    const { isLoading, error, sendRequest, clearError } = useFetcher<GetUpcomingGamesResponse>();

    const fetchUpcomingGames = useCallback(async () => {
      
        return await sendRequest({
            url: `${GAME_API_BASE_URL}/upcoming`,
            options: {
                
                method: 'GET',
            },
        });

    }, []);

    return { isLoading, error, fetchUpcomingGames, clearError }
}

export default useGetUpcomingGames;