function CharacterCard({ character }) {
  return (
    <div
      className="card h-100 mh-90"
      style={{ maxHeight: "80vh", overflow: "auto" }}
    >
      <img
        src={character.imageUrl}
        className="card-img-top"
        alt="image of the character"
        style={{ height: "320px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{character.name}</h5>

        {/* TV */}
        {character.tvShows.length > 0 && (
          <div>
            <div className="fw-bold">TV Shows</div>
            {character.tvShows.map((tvShow) => (
              <div key={tvShow}>{tvShow}</div>
            ))}
          </div>
        )}

        {/* Films & Short Films */}
        {character.films.length > 0 && (
          <div>
            <div className="fw-bold">Films</div>
            {character.films.map((film) => (
              <div key={film}>{film}</div>
            ))}
          </div>
        )}
        {character.shortFilms.length > 0 && (
          <div>
            <div className="fw-bold">Short Films</div>
            {character.shortFilms.map((shortFilm) => (
              <div key={shortFilm}>{shortFilm}</div>
            ))}
          </div>
        )}

        {/* Games */}
        {character.videoGames.length > 0 && (
          <div>
            <div className="fw-bold">Games</div>
            {character.videoGames.map((videoGame) => (
              <div key={videoGame}>{videoGame}</div>
            ))}
          </div>
        )}

        {/* Park Attractions */}
        {character.parkAttractions.length > 0 && (
          <div>
            <div className="fw-bold">Park Attractions</div>
            {character.parkAttractions.map((parkAttraction) => (
              <div key={parkAttraction}>{parkAttraction}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CharacterCard;
