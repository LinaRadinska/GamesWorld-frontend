import { useState, useEffect } from 'react';
import { useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';

import { Facets, Game, Query } from '../../lib/types';
import { convertToURLSearchParams } from '../../lib/Converters';
import useGameApi from '../../lib/useGameApi';

import styles from './CatalogPage.module.css';

import CatalogHeader from "../../components/catalogHeader/CatalogHeader";
import CatalogFilters from "../../components/catalogFilters/CatalogFilters";
import CatalogSort from "../../components/catalogSort/CatalogSort";
import CatalogGameList from "../../components/catalogGameList/CatalogGameList";
import CatalogPagination from "../../components/catalogPagination/CatalogPagination";

const CatalogPage = (): JSX.Element => {
    const pageSize: number = 3;

    const { searchGames } = useGameApi();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [games, setGames] = useState<Game[]>([]);
    const [facets, setFacets] = useState<Facets>({});
    const [query, setQuery] = useState<Query>({
        title: searchParams.get('title') ? searchParams.get('title') : "",
        sortBy: searchParams.get('sortBy') ? searchParams.get('sortBy') : "price",
        discount: searchParams.get('discount') === 'true',
        pageNumber: Number(searchParams.get('pageNumber')) >= 1 ? Number(searchParams.get('pageNumber')) : 1,
        pageSize: pageSize,
        facets: searchParams.get('facets') ? searchParams.get('facets') : ""
    });
    const [numberOfResults, setNumberOfResults] = useState<number>(0);

    useEffect(() => {

        navigate({
            pathname: "/catalog",
            search: `?${createSearchParams(convertToURLSearchParams(query))}`
        });

        searchGames(query.title, query.discount, query.sortBy, query.pageNumber, query.pageSize, query.facets)
            .then(data => {
                setGames(data.results);
                setFacets(data.facets);
                setNumberOfResults(data.totalResults)
            });

    }, [query]);

    return (
        <>
            <div className="main-wrapper">
                <div className="wrapper">
                    <CatalogHeader title={query.title} handleQuery={setQuery} />
                    <div className={styles.catalogContent}>
                        <CatalogFilters facets={facets} queryFacets={query.facets} numberOfResults={numberOfResults} discount={query.discount} pageSize={pageSize} handleQuery={setQuery} />
                        <div className={styles.catalogContentResults}>
                            <CatalogSort handleQuery={setQuery} sortBy={query.sortBy} />
                            <CatalogGameList games={games} />
                            <CatalogPagination numberOfResults={numberOfResults} pageSize={pageSize} pageNumber={query.pageNumber} handleQuery={setQuery} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CatalogPage;