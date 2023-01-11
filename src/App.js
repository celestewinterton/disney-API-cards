import { useEffect, useState } from "react";
import CharacterCard from "./Components/CharacterCard";

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
            console.log(
              "calling getData from API",
              page.nextPage[page.nextPage.length - 1]
            );
            setData(allCharacters);
            setFilteredData(allCharacters);

            // if (page.nextPage) getData(page.nextPage); // view all 7k+ results
            if (page.nextPage && page.nextPage[page.nextPage.length - 1] < 9)
              getData(page.nextPage); // view only first 100 results
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

    setFilteredData(results);
  };

  const clearFilter = (e) => {
    setFilteredData(data);
    setFilter("");
  };

  return (
    <div>
      <div className="container pt-4 pb-4">
        <h1 id="top" className="pt-4">
          Disney Character Explorer
        </h1>
        <div className="input-group mb-3 pt-4">
          <input
            type="text"
            class="form-control"
            placeholder="Search for characters by name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={filter}
            onChange={filterData}
          />
          <button
            class="input-group-text"
            id="basic-addon1"
            onClick={clearFilter}
          >
            Reset
          </button>
        </div>

        <div className="d-flex justify-content-between">
          <div className="text-muted">
            {filter.length > 0 && <>{filteredData.length} Results</>}
          </div>
          <button
            className="btn btn-light"
            onClick={(e) =>
              setFilteredData(filteredData.sort((a, b) => a.name - b.name))
            }
          >
            Sort by A-Z
          </button>
        </div>
      </div>

      <div className="container">
        {filteredData.length > 0 && (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-2">
            {filteredData.slice(0, resultsCount).map((char, i) => (
              <div className="col">
                <CharacterCard character={char} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="container d-flex flex-row-reverse bd-highlight pt-4 pb-4">
        {resultsCount < filteredData.length && (
          <button
            className="btn btn-light"
            onClick={(e) => setResultsCount(resultsCount + 40)}
          >
            View more
          </button>
        )}
        {resultsCount > 40 && (
          <button
            className="btn btn-light"
            onClick={(e) => setResultsCount(resultsCount - 40)}
          >
            View less
          </button>
        )}

        <a href="#top">
          <button className="btn btn-light">Back to top</button>
        </a>
      </div>
    </div>
  );
}

export default App;
