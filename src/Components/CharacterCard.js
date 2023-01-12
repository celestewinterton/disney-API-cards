import { useState } from "react";
import { Modal } from "react-bootstrap";
import url from "../../src/images/mickey.png";

function CharacterCard({ character }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div
        className="card h-100 mh-90 bg-light bg-gradient"
        style={{ maxHeight: "80vh", overflow: "auto" }}
        onClick={handleShow}
      >
        <img
          src={character.imageUrl ? character.imageUrl : url}
          className="card-img-top rounded"
          alt="image of the character"
          style={{
            height: "320px",
            objectFit: "contain",
            padding: "10px",
          }}
        />
        <div className="card-body">
          <h5 className="card-title text-center">{character.name}</h5>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{character.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={character.imageUrl ? character.imageUrl : url}
            className="card-img-top rounded"
            alt="image of the character"
            style={{ height: "320px", objectFit: "contain", padding: "10px" }}
          />
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
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CharacterCard;
