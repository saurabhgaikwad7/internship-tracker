import { useMemo, useCallback } from "react";

const FilterBar = ({ setFilter, setSearch }) => {

  // 1️⃣ Memoize static data
  const filters = useMemo(
    () => ["All", "Applied", "Interview", "Offer", "Rejected"],
    []
  );

  // 2️⃣ Memoize handlers
  const handleSearch = useCallback(
    (e) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );

  const handleFilterClick = useCallback(
    (status) => {
      setFilter(status);
    },
    [setFilter]
  );

  return (
    <div className="filter-bar">
      <input
        className="search-input"
        placeholder="Search company or role"
        onChange={handleSearch}
      />

      <div className="filter-buttons">
        {filters.map((status) => (
          <button
            key={status}
            className="filter-button"
            onClick={() => handleFilterClick(status)}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
