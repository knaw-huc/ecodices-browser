import React from "react";
import {IResultItem} from "../misc/interfaces";
import img from "../assets/img/manuscript.jpg";

function ManuscriptListDetails(props: {result: IResultItem}) {
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
                <li>Overview</li>
                <li>Facsimile</li>
                <li>Description</li>
                <li>Edit CMDI</li>
            </ul>
        </div>
    </div>);
}

export default ManuscriptListDetails;