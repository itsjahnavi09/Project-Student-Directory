function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search by name..."
      value={searchTerm}
      onChange={(event) => onSearchChange(event.target.value)}
    />
  );
}

export default SearchBar;