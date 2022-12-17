import React from "react";

function ExtendedDocument() {
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
                    {document.documentURI}
                </div>
            </div>
            <div className="ecoDetailRow">
                <div className="ecoLabelCell">
                    IIIF Manifest URL
                </div>
                <div className="ecoCell">

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
                    Images:
                </div>
            </div>
        </div>
    </div>)
}

export default ExtendedDocument;