import { useEffect, useState } from "react";
import CharacterCard from "./Components/CharacterCard";
import SortCards from "./Components/SortCards";
import Filter from "./Components/Filter";

function App() {
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [resultsCount, setResultsCount] = useState(40);
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
            allCharacters = [...allCharacters, ...page.data];
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

  return (
    <div>
      <div className="container pt-4 pb-4">
        <h1 id="top" className="pt-4">
          Disney Character Explorer
        </h1>

        <Filter
          setFilteredData={setFilteredData}
          data={data}
          inputDisabled={inputDisabled}
          setFilter={setFilter}
          filter={filter}
        />

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
