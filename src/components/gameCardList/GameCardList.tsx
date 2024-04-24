import { useEffect, useState } from "react";

import { Game } from "../../lib/types";

import useGetUpcomingGames from "../../api/Games/useGetUpcomingGames";

import GameCardItem from "./gameCardItem/GameCardItem";

import styles from './GameCardList.module.css';


const GameCardList = (): JSX.Element => {
    const { isLoading, error, fetchUpcomingGames, clearError } = useGetUpcomingGames();
    const [upcomingGames, setUpcomingGames] = useState<Game[]>([]);

    useEffect(() => {
        
        const loadUpcomingGames = async () => {
            
            const data = await fetchUpcomingGames();
            
            setUpcomingGames(data?.games);
        }

        loadUpcomingGames();

    }, [fetchUpcomingGames])


    return (
        <div className={styles.widgetContainer}>
            <div className={styles.productsWidget}>
                <div className={styles.productsWidgetTitle}>
                    Upcoming Games
                </div>
                <div className={styles.productsWidgetCards}>
                    {upcomingGames?.map((game) => (
                        <GameCardItem key={game.id} game={game} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GameCardList;