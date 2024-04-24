import { useCallback } from "react";
import { GAME_API_BASE_URL } from "../../lib/Constants";
import { GetGameByIdResponse } from "../../lib/types";
import { useFetcher } from "../../lib/useFetcher";

const useGetGame = () => {

    const { isLoading, error, sendRequest, clearError } = useFetcher<GetGameByIdResponse>();

    const fetchGame = useCallback(async (gameId: string) => {

        return await sendRequest({
            url: `${GAME_API_BASE_URL}/${gameId}`,
            options: {
                method: 'GET',
            },
        });

    }, []);

    return { isLoading, error, fetchGame, clearError }
}

export default useGetGame;