import styles from './CatalogGameList.module.css';

import CatalogGameItem from "./catalogGameItem/CatalogGameItem";
import { Game } from '../../lib/types';

const CatalogGameList = ({ games }: {games: Game[]}): JSX.Element => {
    
    return (
        <>
            {games.length == 0 &&
                <div className={styles.resultsMessage}>
                    <h2 className={styles.noResultsMsg}> No results found </h2>
                    <div className={styles.noResultsMsgDescription}>
                        Unfortunately i could not find any results matching your search
                    </div>
                </div>
            }
            <div className={styles.resultsWrapper}>
                {games.map((game) => (
                    <CatalogGameItem key={game.id} game={game} />
                ))}
            </div>
        </>
    );
}

export default CatalogGameList;