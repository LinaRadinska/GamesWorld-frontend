import { useState, useEffect } from 'react';
import { useNavigate, createSearchParams, useSearchParams, URLSearchParamsInit } from 'react-router-dom';

import { Facets, Game, Query } from '../../lib/types';
import { convertOffset, convertToURLSearchParams } from '../../lib/Converters';
import useGameApi from '../../lib/useGameApi';

import styles from './CatalogPage.module.css';

import CatalogHeader from "../../components/catalogHeader/CatalogHeader";
import CatalogFilters from "../../components/catalogFilters/CatalogFilters";
import CatalogSort from "../../components/catalogSort/CatalogSort";
import CatalogGameList from "../../components/catalogGameList/CatalogGameList";
import CatalogPagination from "../../components/catalogPagination/CatalogPagination";

const CatalogPage = (): JSX.Element => {
    const pageSize: number = 6;

    const { searchGames, countGames } = useGameApi();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [games, setGames] = useState<Game[]>([]);
    const [facets, setFacets] = useState<Facets>({});
    const [query, setQuery] = useState<Query>({
        title: searchParams.get('title') ? searchParams.get('title') : "",
        sortBy: searchParams.get('sortBy') ? searchParams.get('sortBy') : "price",
        discount: searchParams.get('discount') === 'true',
        offset: searchParams.get('offset') ? searchParams.get('offset') : 0,
        pageSize: pageSize,
        facets: searchParams.get('facets') ? searchParams.get('facets') : ""
    });

    const [numberOfResults, setNumberOfResults] = useState<number>(0);

    useEffect(() => {

        navigate({
            pathname: "/catalog",
            search: `?${createSearchParams(convertToURLSearchParams(query))}`
        });

        searchGames(query.title, query.discount, query.sortBy, query.offset, query.pageSize, query.facets)
            .then(data => {
                setGames(data.results);
                setFacets(data.facets);
            });

        // countGames(query.query, query.discount)
        //     .then(result => setNumberOfResults(result));


    }, [query]);

    return (
        <>
            <div className="main-wrapper">
                <div className="wrapper">
                    <CatalogHeader title={query.title} handleQuery={setQuery} />
                    <div className={styles.catalogContent}>
                        <CatalogFilters facets={facets} discount={query.discount} pageSize={pageSize} handleQuery={setQuery} />
                        <div className={styles.catalogContentResults}>
                            <CatalogSort handleQuery={setQuery} sortBy={query.sortBy} />
                            <CatalogGameList games={games} />
                            {/* <CatalogPagination numberOfResults={numberOfResults} pageSize={pageSize} handleQuery={setQuery} offset={convertOffset(query.offset)} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CatalogPage;