import React from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import img from "../assets/img/M0004.jpg";
import {HOME, SERVICE} from "../misc/config";
import {IResultItem, IResultList, ICollection_item, ISearchValues, IListData} from "../misc/interfaces";
import Document from "../elements/document";
import ExtendedDocument from "../elements/extendedDocument";
import {fromBase64} from "js-base64";
import iiif from "../assets/img/iiif.png";

function Detail() {
    const dummy: IResultItem = {
        summary: "",
        binding: "",
        language: "",
        tempDate: "",
        collection: "",
        title: "",
        type: "",
        origDate: "",
        settlement: "",
        material: "",
        xml: "",
        place: "",
        decoration: "",
        shelfmark: ""
    }
    const params = useParams();
    const id = params.id as string;
    const filter = params.filter as string;
    const searchValues: ISearchValues[] = JSON.parse(fromBase64(filter));
    const [loading, setLoading] = useState(true);
    const [listFetched, setListFetched] = useState(false);
    const [listData, setListData] = useState<IListData>({amount: 0, items: []});
    const [data, setData] = useState<IResultItem>(dummy);
    const [esID, setEsID] = useState<string>(id);
    const [total, setTotal] = useState(0);
    const [listIndex, setListIndex] = useState(0);
    const [collectionItems, setCollectionItems] = useState<ICollection_item[]>([]);
    const [overview, setOverview] = useState(true);
    const [fullDesc, setFullDesc] = useState(false);
    const [biblio, setBiblio] = useState(false);
    const [collectionFetched, setCollectionFetched] = useState(false);
    document.title = "Manuscript | eCodices NL";

    async function fetch_data() {
        const url = SERVICE + "/manuscript?id=" + esID;
        const response = await fetch(url);
        const json: IResultItem | [] = await response.json();
        if (json !== []) {
            setData(json as IResultItem);
            setLoading(false);
        }
    }

    async function fetch_list_data() {
        const url = SERVICE + "/get_filtered_list";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': HOME
            },
            body: JSON.stringify(searchValues)
        });
        const list: IListData = await response.json();
        setListData(list);
        getIndex();
        setTotal(list.amount);
        setListFetched(true);
    }

    function get_image(settlement: string, shelfmark: string) {
        let id: string = "";

        if (settlement === "Den Haag") {
            id = shelfmark.split(" ").join("_");
        } else {
            if (settlement === "Deventer") {
                id = "ABD_" + shelfmark.split(" ").join("_");
            } else {
                id = "TRL_" + shelfmark.split(" ").join("_");
            }
        }

        return "https://access.ecodices.nl/iiif/image/" + id + "/full/340,/0/default.jpg";
    }

    function getIndex() {
        listData.items.map((item, i) => {
            if (item._id === esID) {
                setListIndex(i);
            }
        })
    }

    useEffect(() => {
        fetch_list_data();
    }, [listFetched]);

    useEffect(() => {
        fetch_data();
    }, [loading, esID]);

    return (

        <div className="hcContentContainer">
            {/*<div className="collectionBrowser">
                {listFetched  ? (
                    <div>Select manuscript from <div className="backToResults" onClick={() => {window.history.back()}}>search results</div>:
                        <div className="arrowNav" onClick={() => {
                            setEsID(listData.items[0]._id);
                            setListIndex(0);
                        }}>↞</div>
                        <div className="arrowNav" onClick={() => {
                            if (listIndex > 0) {
                                setEsID(listData.items[listIndex - 1]._id);
                                setListIndex(listIndex - 1);
                            }

                        }}>←</div>
                            <select id="manSelector" className="selectNav" value={esID} onChange={(e) => {
                                setEsID(e.target.value);
                                setListIndex(e.target.selectedIndex);
                            }}>
                                {listData.items.map((item, index) => {
                                    return (<option value={item._id}>{item.title}</option>)
                                })}
                            </select>
                        <div className="arrowNav" onClick={() => {
                            if (listIndex + 1 < total) {
                                setEsID(listData.items[listIndex + 1]._id);
                                setListIndex(listIndex + 1);
                            }

                        }}>→</div>
                        <div className="arrowNav"onClick={() => {
                            setEsID(listData.items[total - 1]._id);
                            setListIndex(total - 1);
                        }}>↠</div>
                        <div className="amountNav">{listIndex + 1}/{total}</div>
                    </div>
                ) : (
                    <div/>
                )}
            </div>*/}
            <div className="hcLayoutFacet-Result hcBasicSideMargin hcMarginBottom15">
                <div className="hcLayoutFacets">
                    <ul className="facsimileList">
                        <li>Facsimile:</li>
                        <li>Viewer</li>
                        <li>Thumbnails</li>
                    </ul>
                    <img className="facsimileImg" src={get_image(data.settlement, data.shelfmark)}/>
                    <div className="iiifHolder">
                        <img className="iiifImg" src={iiif}/>
                    </div>
                </div>

                <div className="hcLayoutResults">
                    <div className="hcResultsHeader hcMarginBottom1">
                        {loading ? (<div>Loading...</div>) : (
                            <div>
                                <ul className="detailNav">
                                    <li className={`${overview ? 'detailActive' : 'detailInactive'}`} onClick={() => {
                                        setFullDesc(false);
                                        setBiblio(false);
                                        setOverview(true);
                                    }}>Overview
                                    </li>
                                    <li className={`${fullDesc ? 'detailActive' : 'detailInactive'}`} onClick={() => {
                                        setOverview(false);
                                        setBiblio(false);
                                        setFullDesc(true);
                                    }}>Full description
                                    </li>
                                    {/*<li className={`${biblio ? 'detailActive' : 'detailInactive'}`} onClick={() => {
                                    setOverview(false);
                                    setAnnotations(false);
                                    setBiblio(true);
                                }}>Bibliography</li>*/}
                                </ul>
                                <div className="detailBack" onClick={() => {
                                    window.history.back()
                                }}>Back to results
                                </div>
                                <div className="detailArea">
                                    <Document item={data}/>
                                    {fullDesc && (
                                        <div>
                                            <hr className="docSeparator"/>
                                            <ExtendedDocument/></div>)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail;