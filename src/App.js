import { useEffect, useState } from "react";
import CharacterCard from "./Components/CharacterCard";

function App() {
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [resultsCount, setResultsCount] = useState(40);

  // Gets all characters from the API
  useEffect(() => {
    if (data.length < 1) {
      let firstUrl = `https://api.disneyapi.dev/characters`;
      let allCharacters = [];

      console.log(" *** GETTING DATA FROM API *** ");
      const getData = async (url) => {
        await fetch(url)
          .then((res) => res.json())
          .then((page) => {
            allCharacters = [...allCharacters, ...page.data];
            sortData(allCharacters);
            setData(allCharacters);
            setFilteredData(allCharacters);

            if (page.nextPage) getData(page.nextPage); // view all 7k+ results

            // if (page.nextPage && page.nextPage[page.nextPage.length - 1] < 4)
            //   getData(page.nextPage); // Limit @ 150 results
          });
      };

      getData(firstUrl);
    }
  }, []);

  // Shows more cards for infinite scrolling
  const showMore = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom && resultsCount < filteredData.length) {
      setTimeout(() => {
        setResultsCount(resultsCount + 40);
      }, 1200);
    }
  };

  // Listens for bottom of page for infinite scrolling
  useEffect(() => {
    window.addEventListener("scroll", showMore, {
      passive: true,
    });
  });

  // Filters cards by character name based on user input
  const filterData = (e) => {
    let results = data.filter((character) =>
      character.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilter(e.target.value);
    setFilteredData(results);
  };

  // Clears user input to filter cards
  const clearFilter = (e) => {
    setFilteredData(data);
    setFilter("");
  };

  // Sorts character cards alphabetically my name
  const sortData = (e) => {
    const sorted = filteredData.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    setFilteredData(sorted);
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
            className="form-control"
            placeholder="Search for characters by name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={filter}
            onChange={filterData}
          />
          <button
            className="input-group-text btn-secondary"
            id="basic-addon1"
            onClick={clearFilter}
          >
            Reset
          </button>
        </div>

        <div className="d-flex justify-content-between">
          <div className="text-muted d-flex align-items-center">
            {filter.length > 0 && (
              <>
                {filteredData.length} Results for "{filter}"
              </>
            )}
          </div>
          <button className="btn btn-secondary" onClick={sortData}>
            Sort by A-Z
          </button>
        </div>
      </div>

      {/* Card grid container */}
      <div className="container">
        {filteredData.length > 0 && (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-2">
            {filteredData.slice(0, resultsCount).map((char, i) => (
              <div className="col" key={i}>
                <CharacterCard character={char} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Nav back to top */}
      <div className="container d-flex flex-row-reverse bd-highlight pt-4 pb-4">
        <a href="#top" className="m-1">
          <button className="btn btn-primary mb-5">Back to top</button>
        </a>
      </div>
    </div>
  );
}

export default App;
