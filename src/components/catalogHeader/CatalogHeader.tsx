
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import styles from './CatalogHeader.module.css';
import { Query } from "../../lib/types";

type CatalogHeaderProps = {
    title: string | null,
    handleQuery: React.Dispatch<React.SetStateAction<Query>>
}

const CatalogHeader = ({ title, handleQuery }: CatalogHeaderProps) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleQuery((state) => {
            return {
                ...state,
                title: e.target.value,
                offset: 0
            }
        })
    }

    return (
        <div className={styles.catalogHeader}>
            <div className={styles.catalogTitle}>
                All Games
            </div>
            <div className={styles.catalogSearch}>
                <form className={styles.search}>
                    <FontAwesomeIcon className={styles.catalogSearchImage} icon={faMagnifyingGlass} />
                    <input
                        className={styles.catalogSearchInput}
                        type="search"
                        name="search"
                        placeholder="Search shop"
                        value={title == null ? '' : title}
                        onChange={handleChange}
                    />

                </form>
            </div>
        </div>
    );
}

export default CatalogHeader;