import React from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {
    ISendCandidate,
    IFacetCandidate,
    ISearchObject,
    ISearchValues,
    ISendPage,
    IResetFacets,
    IResultList,
    IRemoveFacet
} from "../misc/interfaces";
import {Base64, encodeURL} from "js-base64";
import FreeTextFacet from "../facets/freeTextFacet";
import ListFacet from "../facets/listFacet";
import ShelfmarkListFacet from "../facets/shelfmarkListFacet";
import SecListFacet from "../facets/secListFacet";
import CenturyFacet from "../facets/centuryFacet";
import {SERVICE, HOME} from "../misc/config";
import ManuscriptList from "../elements/manuscriptList";
import {Fragment} from "react";


function Search() {
    const params = useParams();
    const parameters: ISearchObject = JSON.parse(Base64.decode(params.code as string));
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(parameters.page);
    const [refresh, setRefresh] = useState(true);
    const [result, setResult] = useState<IResultList>({amount: 0, pages: 0, items: []});
    const [numberOfItems, setNumberOfItems] = useState(0);
    const [decorationsYes, setDecorationsYes] = useState(false);
    const [shelfmarkYes, setShelfmarkYes] = useState(false);
    const [collectionValue, setCollectionValue] = useState("");


    let navigate = useNavigate();
    document.title = "Search | eCodices NL";

    let searchBuffer: ISearchObject = {
        searchvalues: [],
        page: 1,
        page_length: 500,
        sortorder: "title",
    };

    if (params.code !== undefined) {
        searchBuffer = {
            searchvalues: parameters.searchvalues,
            page: page,
            page_length: 500,
            sortorder: "title",
        };
    }


    let facets = parameters.searchvalues;

    const [searchStruc, setSearchStruc] = useState(searchBuffer);
    const cross: string = "[x]";

    async function fetch_data() {
        const url = SERVICE + "/browse";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': HOME
            },
            body: JSON.stringify(searchStruc)
        });
        const json: IResultList = await response.json();
        setResult(json);
        setNumberOfItems(json.amount);
        setLoading(false);
    }

    const goToPage: ISendPage = (page: number) => {
        searchBuffer.page = page;
        setSearchStruc(searchBuffer);
        setRefresh(!refresh);
        navigate('/search/' + Base64.toBase64(JSON.stringify(parameters)));
        window.scroll(0, 0);
    }

    const removeFacet: IRemoveFacet = (field: string, value: string) => {
        searchBuffer = searchStruc;
        console.log(field);
        if (typeof searchBuffer.searchvalues === "object") {
            searchBuffer.searchvalues.forEach((item: ISearchValues) => {
                if (item.name === field) {
                    item.values = item.values.filter((element => element !== value));
                }
            })
            searchBuffer.searchvalues = searchBuffer.searchvalues.filter(function (el) {
                return el.values.length > 0
            });
            if (searchBuffer.searchvalues.length === 0) {
                searchBuffer.searchvalues = [];
            }
        }

        if (field === 'Decorations') {
            setDecorationsYes(false);
            searchBuffer.searchvalues = searchBuffer.searchvalues.filter((element) => {return element.field !== "decoration"});
        }
        if (field === 'Collection') {
            setShelfmarkYes(false);
            searchBuffer.searchvalues = searchBuffer.searchvalues.filter((element) => {return element.field !== "shelfmark"});
        }
        setSearchStruc(searchBuffer);
        setRefresh(!refresh);
        navigate('/search/' + Base64.toBase64(JSON.stringify(searchStruc)));
        window.scroll(0, 0);
    }

    const resetFacets: IResetFacets = () => {
        searchBuffer = searchStruc;
        searchBuffer.page = 1;
        searchBuffer.searchvalues = [];
        setSearchStruc(searchBuffer);
        setShelfmarkYes(false);
        setDecorationsYes(false);
        setCollectionValue("");
        setRefresh(!refresh);
        navigate('/search/' + Base64.toBase64(JSON.stringify(searchStruc)));
        window.scroll(0, 0);

    }

    const sendCandidate: ISendCandidate = (candidate: IFacetCandidate) => {
        setPage(1);
        switch (candidate.field) {
            case "has_decoration":
                if (candidate.candidate === 'yes') {
                    setDecorationsYes(true);
                } else {
                    setDecorationsYes(false);
                }
                break;
            case "collection":
                setShelfmarkYes(true);
                setCollectionValue(candidate.candidate);
        }
        if (parameters.searchvalues === []) {
            parameters.searchvalues = [{
                name: candidate.facet,
                field: candidate.field,
                values: [candidate.candidate]
            } as ISearchValues];
            parameters.page = 1;
            setSearchStruc(searchBuffer);
            window.location.href = '#search/' + Base64.toBase64(JSON.stringify(searchStruc));
        } else {
            if (typeof parameters.searchvalues === "object") {
                let found: boolean = false;
                parameters.searchvalues.forEach((item) => {
                    if (item.name === candidate.facet) {
                        found = true;
                        if (!item.values.includes(candidate.candidate)) {
                            item.values.push(candidate.candidate);
                        }
                    }
                });
                if (!found) {
                    parameters.searchvalues.push({
                        name: candidate.facet,
                        field: candidate.field,
                        values: [candidate.candidate]
                    });
                }
            }
            searchStruc.page = 1;
        }
        goToPage(page);
        window.scroll(0, 0);
        setRefresh(!refresh);
    }


    useEffect(() => {
        fetch_data();
    }, [refresh]);

    return (
        <div className="hcContentContainer">
            <div className="hcBasicSideMargin hcMarginTop1 hcMarginBottom1">
                <h1>Search</h1>
            </div>
            <div className="hcLayoutFacet-Result hcBasicSideMargin hcMarginBottom15">
                <div className="hcLayoutFacets">
                    <FreeTextFacet add={sendCandidate}/>
                    {shelfmarkYes ? (
                        <ShelfmarkListFacet parentCallback={sendCandidate} collection={encodeURI(collectionValue)} flex={true}/>
                    ) : (
                        <ListFacet parentCallback={sendCandidate} name="Collection" field="collection" flex={false}/>
                    )}

                    <ListFacet parentCallback={sendCandidate} name="Place of Origin" field="place" flex={true}/>
                    <ListFacet parentCallback={sendCandidate} name="Text Language" field="language" flex={false}/>
                    <CenturyFacet parentCallback={sendCandidate} name="Date of Origin" field="origDate"/>
                    <ListFacet parentCallback={sendCandidate} name="Document type" field="type" flex={false}/>
                    <ListFacet parentCallback={sendCandidate} name="Binding" field="binding" flex={false}/>
                    {decorationsYes ? (
                        <SecListFacet parentCallback={sendCandidate} name="Decoration" field="decoration" flex={true}/>
                    ) : (
                        <ListFacet parentCallback={sendCandidate} name="Decorations" field="has_decoration" flex={false}/>
                    )}

                    <ListFacet parentCallback={sendCandidate} name="Material" field="support" flex={false}/>
                    <ListFacet parentCallback={sendCandidate} name="Music Notation" field="musicnotation" flex={false}/>
                </div>
                <div className="hcLayoutResults">
                    <div className="hcResultsHeader hcMarginBottom1">
                        <div>{numberOfItems} manuscripts found</div>
                    </div>
                    <div className="hcMarginBottom2">
                        <div className="hcSmallTxt hcTxtColorGreyMid">Selected facets:
                            <span className="hcFacetReset hcClickable" onClick={resetFacets}>Reset facets</span>
                        </div>
                        {searchStruc.searchvalues.length === 0 ? (
                            <Fragment><span className="hcSelectedFacet"><span
                                className="hcSelectedFacetType">None</span></span></Fragment>
                        ) : (
                            facets.map((item: ISearchValues) => {
                                return (
                                    <span className="hcSelectedFacet"><span
                                        className="hcSelectedFacetType">{item.name}: </span>
                                        {item.values.map(function (skipper, i) {
                                            return (<div className="hcFacetValues" key={i}
                                                         onClick={() => removeFacet(item.name, skipper)}>{skipper} {cross} </div>)
                                        })}
                                    </span>
                                )
                            })
                        )}
                    </div>
                    {/*<div className="hcList">
                        <div className="hcListHeader">
                            <div className="hcLabel">Manuscripts</div>
                        </div>
                    </div>*/}
                    {loading ? (<div className="hcResultListLoading">Loading...</div>) : (
                        <ManuscriptList result={result} filter={parameters.searchvalues} />)}
                </div>
            </div>
        </div>
    )
}

export default Search;