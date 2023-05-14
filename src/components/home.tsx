import React from 'react';
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {ISearchObject} from "../misc/interfaces";
import {Base64} from "js-base64";

function Home() {
    const nav = useNavigate();

    function goSearch(facetValue: string) {
        let searchStruc: ISearchObject = {
            searchvalues: [],
            page: 1,
            page_length: 30,
            sortorder: "title"
        };
        if (facetValue === "all") {
            searchStruc.searchvalues = [];
        }
        const code: string = Base64.encode(JSON.stringify(searchStruc));
        nav("search/" + code);
    }


    useEffect(() => {
        goSearch('all');
    })

    return (<div/>);
}

export default Home;