import React from 'react';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import nlImg from "../assets/img/nl.gif";
import enImg from "../assets/img/en.gif";
import logo from "../assets/img/logo.png"

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
                            <img src={logo}/>
                        </div>
                    </div>

                    <nav>
                        <div className="headerLink" onClick={() => {document.location ="https://ecodices.nl" }}>Project information</div>
                    </nav>
                </header>
            </div>
            <div className="hcContentContainer hcMarginBottom5 hcBorderBottom">

            </div>
        </div>
    )
}

export default PageHeader;