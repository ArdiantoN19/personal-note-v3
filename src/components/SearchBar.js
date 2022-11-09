import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import LocaleContext from '../contexts/LocaleContexts';

function SearchBar({search, onSearch}) {
    const { locale } = useContext(LocaleContext);
    return (
        <div className="search-bar">
            <input type="text" placeholder={locale ==='id' ? 'Ketikkan judul disini...' : 'Type title here...'} value={search} onChange={(e) => onSearch(e.target.value)}/>
        </div>
    );
}

SearchBar.propTypes = {
    search: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar;