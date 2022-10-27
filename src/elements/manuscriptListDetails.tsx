import React from "react";
import {useNavigate} from "react-router-dom";
import {IResultItem, ISearchValues} from "../misc/interfaces";
import img from "../assets/img/manuscript.jpg";
import {toBase64} from "js-base64";
import {stringify} from "querystring";


function ManuscriptListDetails(props: {result: IResultItem, index: number, filter: ISearchValues[]}) {

    let navigate = useNavigate();
    return (<div className="hcResultListDetail">
        <h2>{props.result.title}</h2>
        <img className="hcManuscriptImage" src={img}/>
        <div className="detailLine">{props.result.place}</div>
        <div className="detailLine">{props.result.tempDate} - {props.result.language}</div>
        <div className="detailLine">{props.result.decoration}</div>
        <div className="detailLine">{props.result.material}</div>
        <div className="detailLine"><strong>Online since: 01/11/2020</strong></div>
        <hr/>
        <div className="detailLine">{props.result.summary}</div>
        <hr/>
        <div>
            <ul className="ManuscriptListBtns">
                <li onClick={() => {
                    window.scroll(0, 0);
                    navigate('/detail/' + props.result._id + "/" + toBase64(JSON.stringify(props.filter)))}
                }>Description</li>
                <li>Viewer</li>
                {/*<li>Description</li>*/}
                <li>Edit CMDI</li>
            </ul>
        </div>
    </div>);
}

export default ManuscriptListDetails;