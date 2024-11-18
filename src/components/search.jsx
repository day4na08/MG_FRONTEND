import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/search.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/catalog?query=${encodeURIComponent(query)}`);
    };

    return (
        <form className="from_search" role="search" onSubmit={handleSubmit}>
            <div>
            <input
                className="place_search place_searchf"
                type="search"
                placeholder="Buscar"
                value={query}
                onChange={handleInputChange}
            />
            </div>
            <div>
            </div>
        </form>
    );
};

export default Search;
