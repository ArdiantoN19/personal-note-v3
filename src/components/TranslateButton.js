import React, { useContext } from 'react';
import LocaleContext from '../contexts/LocaleContexts';
import { BsTranslate } from "react-icons/bs";

function TranslateButton() {
    const {toggleLocale} = useContext(LocaleContext);
    return (
        <button className='toggle-locale' onClick={toggleLocale}> <BsTranslate/> </button>
    )
};

export default TranslateButton;