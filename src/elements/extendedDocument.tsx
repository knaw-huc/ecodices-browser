import React from "react";
import {IResultItem} from "../misc/interfaces";

function ExtendedDocument(props: {item: IResultItem, manifestCode: string}) {

    return (<div>
        <div className="ecoDetailTable">
            <div className="ecoDetailRow">
                <div className="ecoLabelCell">
                    Handle
                </div>
                <div className="ecoCell">
                    <div className="hcClickable" onClick={() => {
                        window.open(props.item.handle);
                    }}>{props.item.handle}</div>
                </div>
            </div>
            <div className="ecoDetailRow">
                <div className="ecoLabelCell">
                    Permanent link
                </div>
                <div className="ecoCell">
                    {props.item.permalink}
                </div>
            </div>
            <div className="ecoDetailRow">
                <div className="ecoLabelCell">
                    IIIF Manifest URL
                </div>
                <div className="ecoCell">
                    <div className="hcClickable" onClick={() => {
                        window.open("https://access.ecodices.nl/iiif/presentation/" + props.manifestCode + "/manifest");
                    }}>https://access.ecodices.nl/iiif/presentation/{props.manifestCode}/manifest</div>
                </div>
            </div>
            <div className="ecoDetailRow">
                <div className="ecoLabelCell">
                    How to quote
                </div>
                <div className="ecoCell">
                    {props.item.title}<br/>
                    ({document.documentURI})
                </div>
            </div>
            <div className="ecoDetailRow">
                <div className="ecoLabelCell">
                    Online since
                </div>
                <div className="ecoCell">
                    17/05/2023
                </div>
            </div>
            <div className="ecoDetailRow">
                <div className="ecoLabelCell">
                    Rights
                </div>
                <div className="ecoCell">
                    {props.item.licence}
                </div>
            </div>
        </div>
    </div>)
}

export default ExtendedDocument;