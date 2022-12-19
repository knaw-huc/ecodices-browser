import React from "react";
import {IResultList, IResultItem, ISearchValues} from "../misc/interfaces";
import ManuscriptListDetails from "./manuscriptListDetails";

function ManuscriptList(props: {result: IResultList, filter: ISearchValues[]}) {
    return (
        <div>
        {props.result.items.map((item: IResultItem, index: number) => {
            return (
                <ManuscriptListDetails result={item} index={index}/>
            )
            })}
        </div>)
}

export default ManuscriptList