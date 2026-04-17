import React from "react";
import PropTypes from "prop-types";


function SearchBar({ keyword, KeywordChange }) {
    return (
        <input
            className="search-bar"
            type="text"
            placeholder="Cari berdasarkan nama"
            value={keyword}
            onChange={(event) => KeywordChange(event.target.value)}
        />
    );
}

SearchBar.propTypes = {
    keyword: PropTypes.string.isRequired,
    KeywordChange: PropTypes.func.isRequired
};

export default SearchBar;