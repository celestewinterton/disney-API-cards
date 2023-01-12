import { useState } from "react";

const Filter = ({
  setFilteredData,
  data,
  inputDisabled,
  setFilter,
  filter,
}) => {
  // Filters cards by character name based on user input
  const filterData = (e) => {
    setFilter(e.target.value);

    let results = data.filter((character) =>
      character.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredData(results);
  };

  // Clears user input to filter cards
  const clearFilter = (e) => {
    setFilteredData(data);
    setFilter("");
  };

  return (
    <div className="input-group mb-3 pt-4">
      <input
        type="text"
        className="form-control"
        placeholder={
          inputDisabled
            ? `Still loading characters... (${Math.round(
                (data.length / 7500) * 100
              )} %)`
            : "Search for characters by name"
        }
        aria-label="Username"
        aria-describedby="basic-addon1"
        value={filter}
        onChange={filterData}
        disabled={inputDisabled}
      />
      <button
        className="input-group-text btn-secondary"
        id="basic-addon1"
        onClick={clearFilter}
      >
        Reset
      </button>
    </div>
  );
};

export default Filter;
