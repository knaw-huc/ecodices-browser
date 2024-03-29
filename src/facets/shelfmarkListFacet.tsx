import React from "react";
import {Fragment} from "react";
import {IFacetValue, ISendCandidate} from "../misc/interfaces";
import {useState, useEffect} from "react";
import {SERVICE} from "../misc/config";

function ShelfmarkListFacet(props: {parentCallback: ISendCandidate, collection:string, flex: boolean}) {
    const [data, setData] = useState<IFacetValue[]>([]);
    const [url, setUrl] = useState(SERVICE + "/shelfmark-facet?collection=" + props.collection + "&amount=10");
    const [help, setHelp] = useState(false);
    const [loading, setLoading] = useState(true);
    const [more, setMore] = useState(true);
    const [hidden, setHidden] = useState(false);


    async function fetchData() {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }

    function sendCandidate(value: string) {
        props.parentCallback({facet: "Shelfmark", field: "shelfmark", candidate: value});
    }

    function changeListLength() {
        if (more) {
            setUrl(SERVICE + "/shelfmark-facet?collection=" + props.collection + "&amount=500");
        } else {
            setUrl(SERVICE + "/shelfmark-facet?name=" + props.collection + "&amount=10");
        }
        setMore(!more);
    }

    useEffect(() => {
        fetchData();
    }, [url]);



    return (

        <div className="hcFacet">
            <div className="hcFacetTitle" onClick={() => setHidden(!hidden)}>
                <span>Shelfmarks</span>
                <span className="hcIconHelp">
                    {hidden ? (<Fragment>+</Fragment>) : (<Fragment>-</Fragment>)}
                </span>
            </div>
            {/*{ help &&
            <div className="hcFacetHelp">
                <strong>The {props.name.toLowerCase()} facet </strong><br/>
                Filter on {props.name.toLowerCase()}.
            </div> }*/}
            {!hidden &&
            <div className="hcFacetItems">
                {!loading ? (<div>
                    {data.map((item, index) => {
                        if (item.key !== "") {
                            return (<div key={index} className="hcFacetItem" onClick={() => {
                                sendCandidate(item.key)
                            }}>
                                <div className="checkBoxLabel"> {item.key} <span
                                    className="facetAmount">({item.doc_count})</span></div>
                            </div>);
                        }})}
                    {props.flex && (<div className="hcClickable" onClick={changeListLength}>
                        {more ? (<div>More...</div>) : (<div>Less...</div>)}
                    </div>)}
                </div>) : (<div>Loading...</div>)}
                <div>
                </div>
            </div>
            }
        </div>
    );

}

export default ShelfmarkListFacet;