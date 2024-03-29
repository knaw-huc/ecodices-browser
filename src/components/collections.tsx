import React from 'react';
import {Fragment} from "react";
import {useState, useEffect} from "react";
import {IFacetValue, ISearchObject, ISearchValues} from "../misc/interfaces";
import {HOME, SERVICE} from "../misc/config";
import {Base64} from "js-base64";
import {useNavigate} from "react-router-dom";
import puzzle from "../assets/img/puzzle.jpg";

function Collections() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<IFacetValue[]>([]);
    let navigate = useNavigate();

    async function fetchData() {
        const url = SERVICE + "/facet?name=collection&amount=500";
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': HOME
            }
        });
        const json: IFacetValue[] = await response.json();
        setData(json);
        setLoading(false);
    }

    function goSearch(facetValue: string) {
        let searchStruc: ISearchObject = {
            searchvalues: [{name: "Collection", field: "collection", values: [facetValue]}],
            page: 1,
            page_length: 30,
            sortorder: "title"
        };
        if (facetValue === "all") {
            searchStruc.searchvalues = [];
        }
        const code: string = Base64.encode(JSON.stringify(searchStruc));
        navigate("search/" + code);
    }

    useEffect(() => {
        fetchData();
    }, [loading]);

    return (
        <div className="hcContentContainer">
            <div className="hcRow">
                <div className="hcColumn hcBorder">
                    <h2>Collections</h2>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div>
                            <div className="hcClickable" onClick={() => {
                                goSearch("all")
                            }}>All collections <strong>(186)</strong></div>
                            <br/>
                            {data.map((item, index) => {
                                return (
                                    <Fragment>
                                        <div className="hcClickable" onClick={() => {
                                            goSearch(item.key)
                                        }} key={index}>{item.key} <strong>({item.doc_count})</strong></div>
                                        <br/></Fragment>
                                )
                            })}
                        </div>
                    )}
                </div>
                <div className="hcColumn">
                    <div className="ecoHomeBox">
                        Text about this database
                    </div>
                    <div className="ecoHomeBox">

                    </div>
                </div>
            </div>
        </div>
    )

}

export default Collections;