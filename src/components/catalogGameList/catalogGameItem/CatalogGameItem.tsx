import { Link } from 'react-router-dom';
import { Game } from '../../../lib/types';

import styles from './CatalogGameItem.module.css';


const CatalogGameItem = ({ game }: {game: Game}): JSX.Element => {

    let price: string = game.price.toFixed(2);
    let discountedPrice: string = game.discountedPrice.toFixed(2);

    return (
        <div className={styles.resultsCardWrapper}>
            <div className={styles.resultsCard}>
                <div className={styles.resultsCardImgWrapper}>
                    <img
                        className={styles.resultsCardImg}
                        src={`${game.cover}`}
                        alt={game.title}
                    />
                </div>
                <div className={styles.resultsCardTitle}>
                    {game.title}
                </div>
                <div className={styles.resultsCardContent}>

                    {discountedPrice == price
                        ? <div className={styles.resultsCardPrice}>
                            <div className={styles.resultsCardPriceFinal}>
                                {price}€
                            </div>
                        </div>
                        : <div className={styles.resultsCardPrice}>
                            <div className={styles.resultsCardPriceBase}>
                                {price}
                            </div>
                            <div className={styles.resultsCardPriceFinal}>
                                {discountedPrice}€
                            </div>
                        </div>
                    }

                    <div className={styles.resultsCardAddToCart}>
                        <button className={styles.detailButton} style={{ background: "linear-gradient(#c026d37a, #7c3aed91)" }}>
                            <Link to={`/detail/${game.id}`} className={styles.detailButtonLink}>
                                View
                            </Link>
                        </button>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default CatalogGameItem;