import { Link } from 'react-router-dom';
import { Game } from '../../../lib/types';

import styles from './GameCardItem.module.css';

const GameCardItem = ({game}: {game: Game}): JSX.Element => {

    return (
        <div className={styles.productsWidgetCard}>
            <Link to={`/detail/${game.id}`} className={styles.productsWidgetCardLink}>
                <img
                    className={styles.productsWidgetCardImg}
                    src={`${game.cover}`}
                    alt={game.title}
                />
            </Link>
            <div className={styles.productsWidgetCardTitle}>
                {game.title}
            </div>
            <Link to={`/detail/${game.id}`} className={styles.productsWidgetCardButtonLink}>
                <div className={styles.productsWidgetCardButtonText}> View </div>
            </Link>
        </div>
    );
}

export default GameCardItem;