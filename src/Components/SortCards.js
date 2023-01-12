import { Dropdown, DropdownButton } from "react-bootstrap";

function SortCards({ filteredData, setFilteredData }) {
  // Sort Alphabetically
  const sortAtoZ = (e) => {
    const sorted = [...filteredData].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    setFilteredData(sorted);
  };

  const sortZtoA = (e) => {
    const sorted = [...filteredData].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
      return 0;
    });

    setFilteredData(sorted);
  };

  // Sort by Popularity
  const sortMostPopular = (e) => {
    const sorted = [...filteredData].sort((a, b) => {
      const aPopularity =
        a.films.length +
        a.tvShows.length +
        a.shortFilms.length +
        a.videoGames.length +
        a.parkAttractions.length;
      const bPopularity =
        b.films.length +
        b.tvShows.length +
        b.shortFilms.length +
        b.videoGames.length +
        b.parkAttractions.length;
      if (aPopularity > bPopularity) return -1;
      if (aPopularity < bPopularity) return 1;
      return 0;
    });

    setFilteredData(sorted);
  };

  const sortLeastPopular = (e) => {
    const sorted = [...filteredData].sort((a, b) => {
      const aPopularity =
        a.films.length +
        a.tvShows.length +
        a.shortFilms.length +
        a.videoGames.length +
        a.parkAttractions.length;
      const bPopularity =
        b.films.length +
        b.tvShows.length +
        b.shortFilms.length +
        b.videoGames.length +
        b.parkAttractions.length;
      if (aPopularity < bPopularity) return -1;
      if (aPopularity > bPopularity) return 1;
      return 0;
    });

    setFilteredData(sorted);
  };

  return (
    <DropdownButton id="dropdown-basic-button" variant="secondary" title="Sort">
      <Dropdown.Item href="#" onClick={sortAtoZ}>
        Alphabetical (A-Z)
      </Dropdown.Item>
      <Dropdown.Item href="#" onClick={sortZtoA}>
        Alphabetical (Z-A)
      </Dropdown.Item>
      <Dropdown.Item href="#" onClick={sortMostPopular}>
        Most popular
      </Dropdown.Item>
      <Dropdown.Item href="#" onClick={sortLeastPopular}>
        Least popular
      </Dropdown.Item>
    </DropdownButton>
  );
}

export default SortCards;
