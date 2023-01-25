import React from "react";
import {useState, useEffect} from "react";
import {IExtendedViewItem} from "../misc/interfaces";
import {SERVICE} from "../misc/config";
import {get_iiif_code} from "../misc/functions";

function FullDescription (props: {id: string, title: string}) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<IExtendedViewItem[]>([]);
    let currentField = '';

    async function fetch_data() {
        const url = SERVICE + "/fulldesc?id=" + props.id;
        const response = await fetch(url);
        const json: IExtendedViewItem[] = await response.json();
        if (json !== []) {
            setData(json);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetch_data();
    }, [loading]);

    return <div>
        {loading ? (
            <div>Loading...</div>
        ) : (<div>
            <h3 className="detailH3">{props.title}</h3>
            {
                data.map((item, index) => {
                if (item.field === 'line') {
                    return (<hr className="docSeparator"/>);
                } else {
                    if (item.field !== currentField) {
                        currentField = item.field;
                return (
                    <div className="ecoDetailRow">
                        <div className="ecoLabelCell">
                            {item.label}
                        </div>
                        <div className="ecoCell">
                            {item.value}
                        </div>
                    </div>
                )} else {
                        return (
                            <div className="ecoDetailRow">
                                <div className="ecoLabelCell"/>
                                <div className="ecoCell">
                                    {item.value}
                                </div>
                            </div>
                        )
                    }}
            })}
        </div>)}

    </div>
}

export default FullDescription;