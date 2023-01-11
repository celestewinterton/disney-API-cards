function Card({ character }) {
  return (
    <div>
      <div>{character.name}</div>
      <img src={character.imageUrl} />
      {/* <div>{character.allies}</div>
      <div>{character.enemies}</div>
      <div>{character.films}</div>
      <div>{character.tvShows}</div>
      <div>{character.shortFilms}</div>
      <div>{character.videoGames}</div>
      <div>{character.videoGames}</div> */}
    </div>
  );
}

export default Card;
