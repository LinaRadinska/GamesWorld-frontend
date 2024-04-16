import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { Query } from '../../lib/types';

import styles from './CatalogPagination.module.css';
import usePagination from "../../lib/usePagination";

type CatalogPaginationProps = {
    numberOfResults: number,
    pageSize: number,
    pageNumber: number,
    handleQuery: React.Dispatch<React.SetStateAction<Query>>
}

const CatalogPagination = ({ numberOfResults, pageSize, pageNumber, handleQuery }: CatalogPaginationProps) => {
    let pages: JSX.Element[] = [];

    let numberOfPages: number = Math.ceil(numberOfResults / pageSize);
    let siblingCount = 1;

    const { paginationRange } = usePagination({ numberOfResults, pageSize, siblingCount, currentPage: pageNumber });

    console.log(paginationRange);

    if (paginationRange) {
        pages = paginationRange.map((currentPage, i) => {

            if (currentPage === "DOTS") {
                return <span key={i}>...</span>;
            }

            return (
                <button key={i} className={`${styles.paginationButton} ${pageNumber === currentPage ? styles.bold : ''}`} onClick={() => {
                    handleQuery((state) => {
                        return {
                            ...state,
                            pageNumber: Number(currentPage)
                        }
                    })
                }}>
                    {currentPage}
                </button>
            )

        })
    }

    return (
        <div className={styles.pagination}>
            <button
                className={`${styles.paginationButton} ${pageNumber <= 1 ? styles.disabledPaginationButton : ''}`}
                disabled={pageNumber <= 1}
                onClick={() => {
                    let prev = pageNumber - 1;
                    handleQuery((state) => {
                        return {
                            ...state,
                            pageNumber: prev
                        }
                    })
                }}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            {pages}
            <button
                className={`${styles.paginationButton} ${pageNumber >= numberOfPages ? styles.disabledPaginationButton : ''}`}
                disabled={pageNumber >= numberOfPages}
                onClick={() => {
                    let next = pageNumber + 1;
                    handleQuery((state) => {
                        return {
                            ...state,
                            pageNumber: next
                        }
                    })
                }}>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    )
}

export default CatalogPagination;