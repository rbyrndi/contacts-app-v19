import React from "react";
import PropTypes from "prop-types";
import { LocaleConsumer } from "../contexts/LocaleContext";


function SearchBar({ keyword, KeywordChange }) {
    return (
        <LocaleConsumer>
            {
                ({ locale }) => (
                    <input
                        className="search-bar"
                        type="text"
                        placeholder={locale === 'id' ? 'Cari berdasarkan nama' : 'Search by name'}
                        value={keyword}
                        onChange={(event) => KeywordChange(event.target.value)}
                    />
                )}
        </LocaleConsumer>
    );
}

SearchBar.propTypes = {
    keyword: PropTypes.string.isRequired,
    KeywordChange: PropTypes.func.isRequired
};

export default SearchBar;