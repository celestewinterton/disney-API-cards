import { Button, Card } from "react-bootstrap";

function CharacterCard({ character }) {
  return (
    <div className="card">
      <img src={character.imageUrl} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{character.name}</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        {/* <div>{character.allies}</div>
            <div>{character.enemies}</div>
            <div>{character.films}</div>
            <div>{character.tvShows}</div>
            <div>{character.shortFilms}</div>
            <div>{character.videoGames}</div>
            <div>{character.videoGames}</div> */}
      </div>
    </div>
  );
}

export default CharacterCard;
