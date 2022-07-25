import React from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {ISendCandidate, IFacetCandidate, ISearchObject, ISearchValues, ISendPage} from "../misc/interfaces";
import {Base64} from "js-base64";
import FreeTextFacet from "../facets/freeTextFacet";

function Search() {
    const params = useParams();
    const parameters: ISearchObject = JSON.parse(Base64.decode(params.code as string));
    console.log(parameters);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(parameters.page);
    const [refresh, setRefresh] = useState(true);
    let navigate = useNavigate();
    document.title = "Search | eCodices NL";

    let searchStruc: ISearchObject = {
        searchvalues: parameters.searchvalues,
        page: page,
        page_length: 30,
        sortorder: "title",
    };

    const goToPage: ISendPage = (page: number) => {

        parameters.page = page;
        //setSearchStruc(searchBuffer);
        setRefresh(!refresh);
        navigate('/search/' + Base64.toBase64(JSON.stringify(parameters)));
        window.scroll(0, 0);
    }

    const sendCandidate: ISendCandidate = (candidate: IFacetCandidate) => {
        setPage(1);
        if (parameters.searchvalues === []) {
            parameters.searchvalues = [{
                name: candidate.facet,
                field: candidate.field,
                values: [candidate.candidate]
            } as ISearchValues];
            parameters.page = 1;
            //setSearchStruc(searchBuffer);
            //window.location.href = '#search/' + Base64.toBase64(JSON.stringify(searchStruc));
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
    }
    return (
        <div className="hcContentContainer">
            <div className="hcBasicSideMargin hcMarginTop1 hcMarginBottom1">
                <h1>Search</h1>
            </div>
            <div className="hcLayoutFacet-Result hcBasicSideMargin hcMarginBottom15">
                <div className="hcLayoutFacets">
                    <FreeTextFacet add={sendCandidate}/>
                </div>
            </div>
        </div>
    )
}

export default Search;