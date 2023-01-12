import { useEffect, useState } from "react";
import CharacterCard from "./Components/CharacterCard";
import SortCards from "./Components/SortCards";
import Filter from "./Components/Filter";
import logo from "../src/images/mickey.png";

function App() {
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [resultsCount, setResultsCount] = useState(48);
  const [data, setData] = useState([]);
  const [inputDisabled, setInputDisabled] = useState(true);

  // Gets all characters from the API
  useEffect(() => {
    if (!data.length) {
      let firstUrl = `https://api.disneyapi.dev/characters`;
      let allCharacters = [];

      const getData = async (url) => {
        await fetch(url)
          .then((res) => res.json())
          .then((page) => {
            allCharacters = [...allCharacters, ...page.data].sort((a, b) => {
              const nameA = a.name.toUpperCase();
              const nameB = b.name.toUpperCase();
              if (nameA < nameB) return -1;
              if (nameA > nameB) return 1;
              return 0;
            });
            setData(allCharacters);
            setFilteredData(allCharacters);

            if (page.nextPage) getData(page.nextPage); // view all 7k+ results
            // Change condition to view less -> Ex: (page.nextPage && page.nextPage[page.nextPage.length - 1] < 4)
            else setInputDisabled(false);
          });
      };

      getData(firstUrl);
    }
  }, []);

  return (
    <div>
      <div className="container pt-4 pb-4">
        <h1 id="top" className="pt-4 fw-bolder d-flex align-items-center">
          <img
            src={logo}
            alt="Mickey Mouse"
            style={{ height: "80px", objectFit: "contain", padding: "10px" }}
          />
          Disney Character Explorer
        </h1>

        <Filter
          setFilteredData={setFilteredData}
          data={data}
          inputDisabled={inputDisabled}
          setFilter={setFilter}
          filter={filter}
        />

        {/* Display filter results */}
        <div className="d-flex justify-content-between">
          <div className="text-muted d-flex align-items-center">
            {filter.length > 0 && (
              <>
                {filteredData.length} Results for "{filter}"
              </>
            )}
          </div>

          <SortCards
            filteredData={filteredData}
            setFilteredData={setFilteredData}
          />
        </div>
      </div>

      {/* Card grid container */}

      <div className="container">
        <div className="text-muted d-flex align-items-center">
          Select a card to see more!
        </div>
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
          <button className="btn btn-primary">Back to top</button>
        </a>

        {resultsCount < filteredData.length && (
          <button
            className="btn btn-primary m-1"
            onClick={(e) => setResultsCount(resultsCount + 48)}
          >
            View more
          </button>
        )}
        {resultsCount > 40 && (
          <button
            className="btn btn-primary m-1"
            onClick={(e) => setResultsCount(resultsCount - 48)}
          >
            View less
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
