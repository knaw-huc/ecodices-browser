import React from 'react';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import nlImg from "../assets/img/nl.gif";
import enImg from "../assets/img/en.gif";

function PageHeader() {
    const [lang, setLang] = useState('en');

    function languageSwitch() {
        if (lang === 'en' ) {
            setLang('nl');
        } else {
            setLang('en');
        }
    }

    const navigate = useNavigate();
    return (
        <div>
            <div className="hcContentContainer bgColorBrand1 hcMarginBottom1">
                <header className=" hcPageHeaderSimple hcBasicSideMargin">
                    <div className="hcBrand">
                        <div className="hcBrandLogo" onClick={() => {navigate("/")}}>
                            <div className="hcTitle">eCodices NL</div>
                        </div>
                    </div>

                    <nav>
                        <div>persons index</div>
                        <div>browse & search</div>
                        <div>about</div>
                        <div onClick={() => {languageSwitch()}}>{lang === 'en' ? (<img src={nlImg}/>) : (<img src={enImg}/>) }</div>
                    </nav>
                </header>
            </div>
            <div className="hcContentContainer hcMarginBottom5 hcBorderBottom">

            </div>
        </div>
    )
}

export default PageHeader;