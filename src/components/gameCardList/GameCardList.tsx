import { useEffect, useState } from "react";
import { Game } from "../../lib/types";

import styles from './GameCardList.module.css';

import GameCardItem from "./gameCardItem/GameCardItem";
import useGameApi from "../../lib/useGameApi";


const GameCardList = (): JSX.Element => {
    const { useGetUpcomingGames } = useGameApi();
    const {data, error, isLoading} = useGetUpcomingGames();


    return (
        <div className={styles.widgetContainer}>
            <div className={styles.productsWidget}>
                <div className={styles.productsWidgetTitle}>
                    Upcoming Games
                </div>
                <div className={styles.productsWidgetCards}>
                    {data?.games.map((game) => (
                        <GameCardItem key={game.id} game={game} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GameCardList;