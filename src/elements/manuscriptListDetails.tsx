import React from "react";
import {useNavigate} from "react-router-dom";
import {IResultItem, ISearchValues} from "../misc/interfaces";
import img from "../assets/img/manuscript.jpg";
import {toBase64} from "js-base64";
import {stringify} from "querystring";
import {get_iiif_code} from "../misc/functions";


function ManuscriptListDetails(props: {result: IResultItem, index: number}) {

    let navigate = useNavigate();

    function get_image(settlement: string, shelfmark: string) {
        const id:string = get_iiif_code(settlement, shelfmark);

        return "https://access.ecodices.nl/iiif/image/" + id + "/full/150,/0/default.jpg";
    }

    return (<div className="hcResultListDetail">
        <h2>{props.result.title}</h2>
        <img className="hcManuscriptImage" src={get_image(props.result.settlement, props.result.shelfmark)}/>
        <div className="detailLine">{props.result.place}</div>
        <div className="detailLine">{props.result.tempDate} - {props.result.language}</div>
        <div className="detailLine">{props.result.decoration}</div>
        <div className="detailLine">{props.result.material}</div>
        <div className="detailLine"><strong>Online since: 17/05/2023</strong></div>
        <hr/>
        <div className="detailLine">{props.result.summary}</div>
        <hr/>
        <div>
            <ul className="ManuscriptListBtns">
                <li onClick={() => {
                    window.scroll(0, 0);
                    navigate('/detail/' + props.result._id + "/overview")}
                }>Overview</li>
                <li onClick={() => {
                    window.scroll(0, 0);
                    navigate('/detail/' + props.result._id + "/full")}
                }>Full description</li>
                <li onClick={() => {window.open("https://access.ecodices.nl/universalviewer/#?manifest=https://access.ecodices.nl/iiif/presentation/" + get_iiif_code(props.result.settlement, props.result.shelfmark) + "/manifest");}}>Viewer</li>
                {/*<li>Description</li>*/}
                <li></li>
            </ul>
        </div>
        <div className="navUp" onClick={() => {window.scroll(0,0)}}>&#8593;</div>
    </div>);
}

export default ManuscriptListDetails;