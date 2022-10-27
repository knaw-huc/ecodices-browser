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
        if (facetValue == "all") {
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
                            }}>All collections <strong>(191)</strong></div>
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
                        <h2>Exposition</h2>
                        <div><strong>Medieval Aerobics</strong></div>
                        <div><img className="puzzle" src={puzzle}/></div>
                        <div className="smallLink">Visit</div>
                    </div>
                    <div className="ecoHomeBox">
                        <h2>News</h2>
                        <ul>
                            <li className="smallLink2">Voynich manuscript deciphered</li>
                            <li className="smallLink2">Carolingian manuscript found on moon</li>
                            <li className="smallLink2">Announcement Scribe of the Month</li>
                        </ul>
                        <div className="smallLink">More</div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Collections;