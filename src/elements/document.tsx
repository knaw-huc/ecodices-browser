import React from "react";
import {IResultItem, ISearchObject} from "../misc/interfaces";
import {Base64} from "js-base64";
import {useNavigate} from "react-router-dom";

function Document(props: {item: IResultItem}) {
    let navigate = useNavigate();

    function goSearch(label: string, field: string, facetValue: string) {
        let searchStruc: ISearchObject = {
            searchvalues: [{name: label, field: field, values: [facetValue]}],
            page: 1,
            page_length: 30,
            sortorder: "title"
        };
        const code: string = Base64.encode(JSON.stringify(searchStruc));
        navigate("/search/" + code);
    }

    return (<div>
        <h3 className="detailH3">{props.item.title}</h3>
        <div className="ecoDetailTable">
            <div className="ecoDetailRow">
                <div className="ecoLabelCell">
                    Shelfmark
                </div>
                <div className="ecoCell">
                    {props.item.title}
                </div>
            </div>
            <div className="ecoDetailRow">
                <div className="ecoLabelCell">
                    Origin and date
                </div>
                <div className="ecoCell">
                    {props.item.origin}
                </div>
            </div>

            <div className="ecoDetailRow">
                <div className="ecoLabelCell">
                    Summary
                </div>
                <div className="ecoCell">
                    {props.item.summary}
                </div>
            </div>
            {/*<div className="ecoDetailRow">
                <div className="ecoLabelCell">
                    Library/collection
                </div>
                <div className="ecoCell">
                    <div className="" onClick={() => goSearch("Collection", "collection", props.item.collection)}>{props.item.collection}</div>
                </div>
            </div>*/}
            <div className="ecoDetailRow">
                <div className="ecoLabelCell">
                    Language
                </div>
                <div className="ecoCell">
                    {props.item.language}
                </div>
            </div>
            <div className="ecoDetailRow">
                <div className="ecoLabelCell">
                    Material
                </div>
                <div className="ecoCell">
                    <div className="ecoCellClickable" onClick={() => goSearch("Material", "support", props.item.support)}>{props.item.support}</div>
                </div>
            </div>
            <div className="ecoDetailRow">
                <div className="ecoLabelCell">
                    Format
                </div>
                <div className="ecoCell">

                </div>
            </div>
            <div className="ecoDetailRow">
                <div className="ecoLabelCell">
                    Pages
                </div>
                <div className="ecoCell">

                </div>
            </div>
            <div className="ecoDetailRow">
                <div className="ecoLabelCell">
                    Century
                </div>
                <div className="ecoCell">
                    <div className="ecoCellClickable" onClick={() => goSearch("Date of origin", "origDate", props.item.origDate)}>{props.item.origDate}</div>
                </div>
            </div>
           {/* <div className="ecoDetailRow">
                <div className="ecoLabelCell">
                    Dated
                </div>
                <div className="ecoCell">
                    {props.item.tempDate}
                </div>
            </div>*/}
            <div className="ecoDetailRow">
                <div className="ecoLabelCell">
                    Binding
                </div>
                <div className="ecoCell">
                    {props.item.binding}
                </div>
            </div>
        </div>
    </div>)
}

export default Document;