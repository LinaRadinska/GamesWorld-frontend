import { useEffect, useState } from 'react';
import { Facets, Query } from '../../lib/types';

import styles from './CatalogFilters.module.css';

type CatalogFiltersProps = {
    facets: Facets,
    queryFacets: string | null,
    numberOfResults: number,
    discount: boolean,
    pageSize: number,
    handleQuery: React.Dispatch<React.SetStateAction<Query>>
}

type SelectedFacet = {
    [category: string]: string[];
}

const CatalogFilters = ({ facets, queryFacets, numberOfResults, discount, pageSize, handleQuery }: CatalogFiltersProps) => {

    const buildSelectedFacetsFromQuery = (queryFacets: string | null): SelectedFacet => {

        let selectedFacets: SelectedFacet = {};

        if (queryFacets) {
            queryFacets.split("|").forEach(function (pair) {
                let keyValue = pair.split(":");
                let facetName = keyValue[0];
                let facetValue = keyValue[1];
                selectedFacets[facetName] = facetValue.split(",");
            });
        }

        return selectedFacets
    }

    const [selectedFacets, setSelectedFacets] = useState<SelectedFacet>(buildSelectedFacetsFromQuery(queryFacets));

    const handleCheckboxChange = (category: string, facetId: string) => {

        setSelectedFacets(prevState => {
            const prevCategoryState = prevState[category] || [];

            if (prevCategoryState.includes(facetId)) {
                const filteredCategoryState = prevCategoryState.filter(facetIdInCategory => facetIdInCategory != facetId);
                return {
                    ...prevState,
                    [category]: filteredCategoryState,
                };
            }

            return {
                ...prevState,
                [category]: [
                    ...prevCategoryState,
                    facetId
                ],
            };
        });
    }

    function generateQueryFacetString(selectedFacets: SelectedFacet) {
        const queryFacetStringParts: string[] = [];

        for (const category in selectedFacets) {
            const facetIds = selectedFacets[category];

            if (facetIds.length > 0) {
                queryFacetStringParts.push(`${category}:${facetIds.join(',')}`);
            }
        }

        return queryFacetStringParts.length > 0 ? queryFacetStringParts.join('|') : '';
    }

    useEffect(() => {
        const queryFacetString = generateQueryFacetString(selectedFacets);

        handleQuery((state) => {
            return {
                ...state,
                facets: queryFacetString
            }
        })
    }, [selectedFacets]);

    return (
        <div className={styles.catalogContentFilters}>
            {numberOfResults > 0 &&
                <>
                    <div className={styles.filterBox}>
                        <div className={styles.filterBoxContent}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    checked={discount}
                                    type="checkbox"
                                    className={styles.checkboxInput}
                                    onChange={(e) => handleQuery(state => {
                                        return {
                                            ...state,
                                            offset: 0,
                                            pageSize: pageSize,
                                            discount: e.target.checked
                                        }
                                    })}
                                />
                                <span className={styles.checkmark} />
                                Show only discounted
                            </label>
                        </div>
                    </div>
                    {facets && Object.entries(facets).map(([facetCategory, allFacets]) => {
                        let numOfFacetsInCategory = facets[facetCategory].length;

                        return (
                            numOfFacetsInCategory > 0
                                ? <div key={facetCategory} className={styles.filterBox}>
                                    <div className={styles.filterBoxHeader}>
                                        {facetCategory}
                                    </div>
                                    {allFacets.map((facet, index) => (
                                        <div key={index} className={styles.filterBoxContent}>
                                            <label className={styles.checkboxLabel}>
                                                <input
                                                    type="checkbox"
                                                    className={styles.checkboxInput}
                                                    id={facet.id}
                                                    name={facet.name}
                                                    checked={selectedFacets[facetCategory] && selectedFacets[facetCategory].includes(facet.id) || false}
                                                    onChange={(e) => handleCheckboxChange(facetCategory, facet.id)}
                                                />
                                                <span className={styles.checkmark} />
                                                {facet.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                : null
                        )
                    })}
                </>
            }
        </div>
    );
}

export default CatalogFilters;