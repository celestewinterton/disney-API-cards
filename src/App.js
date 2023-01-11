import { useEffect, useState } from "react";
import Card from "./Components/Card";

// Instructions
// Create a React application that pulls data from this API (https://disneyapi.dev/)
// and outputs the responses as Cards using the Bootstrap 5 Framework

// There should be an input box to filter the Cards based on the character's name
// and the ability to sort the Cards alphabetically. When completed, please provide
// a link to Repo with the relevant files and build instructions included.

// dynamic search terms, no of results as you filter down

function App() {
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [resultsCount, setResultsCount] = useState(40);

  useEffect(() => {
    if (!data.length) {
      let firstUrl = `https://api.disneyapi.dev/characters`;
      let allCharacters = [];

      const getData = async (url) => {
        await fetch(url)
          .then((res) => res.json())
          .then((page) => {
            allCharacters = [...allCharacters, ...page.data];
            console.log("calling getData from API", data);
            setData(allCharacters);
            setFilteredData(allCharacters);

            if (page.nextPage) getData(page.nextPage);
          });
      };

      getData(firstUrl);
    }
  }, []);

  console.log("App Component", data, filter);

  const filterData = (e) => {
    setFilter(e.target.value);

    let results = data.filter((character) =>
      character.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(filter, results);
    setFilteredData(results);
  };

  const clearFilter = (e) => {
    setFilteredData(data);
    setFilter("");
  };

  return (
    <div>
      <h1>Disney Character Explorer</h1>
      <label htmlFor="filter" className="">
        Filter
      </label>
      <input value={filter} onChange={filterData}></input>
      <button onClick={clearFilter}>X</button>
      <button
        onClick={(e) => setFilteredData(data.sort((a, b) => a.name - b.name))}
      >
        Sort by A-Z
      </button>

      {filter.length > 0 && <div>{filteredData.length} Results</div>}

      {filteredData.length > 0 && (
        <ul>
          {filteredData.slice(0, resultsCount).map((char, i) => (
            <li key={i}>
              <Card character={char} />
            </li>
          ))}
        </ul>
      )}

      {resultsCount < filteredData.length && (
        <button onClick={(e) => setResultsCount(resultsCount + 40)}>
          View more
        </button>
      )}
      {resultsCount > 40 && (
        <button onClick={(e) => setResultsCount(resultsCount - 40)}>
          View less
        </button>
      )}

      <button>Back to top</button>
    </div>
  );
}

export default App;
