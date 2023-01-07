import { useState } from 'react';
import PropTypes from 'prop-types';

export default function SearchBar({ onSubmiting }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      alert('Enter a search request');
      return;
    }
    onSubmiting(searchQuery);
    setSearchQuery('');
  };

  const handleChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          name="query"
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmiting: PropTypes.func.isRequired,
};
