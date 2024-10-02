import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === '') {
      return alert('Please enter a search query.');
    }
    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <header className={styles.searchBar}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
