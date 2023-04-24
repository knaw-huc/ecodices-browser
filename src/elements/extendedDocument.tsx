import React from "react";
import {IResultItem} from "../misc/interfaces";

function ExtendedDocument(props: {item: IResultItem, manifestCode: string}) {
    return (<div>
        <div className="ecoDetailTable">
            <div className="ecoDetailRow">
                <div className="ecoLabelCell">
                    DOI (Digital Object Identifier)
                </div>
                <div className="ecoCell">

                </div>
            </div>
            <div className="ecoDetailRow">
                <div className="ecoLabelCell">
                    Permanent link
                </div>
                <div className="ecoCell">
                    {document.URL}
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

                </div>
            </div>
            <div className="ecoDetailRow">
                <div className="ecoLabelCell">
                    Online since
                </div>
                <div className="ecoCell">

                </div>
            </div>
            <div className="ecoDetailRow">
                <div className="ecoLabelCell">
                    Rights
                </div>
                <div className="ecoCell">

                </div>
            </div>
        </div>
    </div>)
}

export default ExtendedDocument;