type CardProps = {
  card: CardData;
  setModalImage: any;
  isAdded: boolean;
  addCardToInventory: any;
  removeCardFromInventory: any;
};

export default function Card({
  card,
  setModalImage,
  isAdded,
  addCardToInventory,
  removeCardFromInventory,
}: CardProps) {
  return (
    <div key={card.id} className="card">
      <img
        src={card.images?.small}
        alt={card.name}
        style={{ cursor: "pointer" }}
        onClick={() => setModalImage(card.images?.large || card.images?.small)}
      />
      <div className="card-details">
        <div className="card-name">{card.name || "Unknown Name"}</div>
        <div>{card.rarity || "Unknown Rarity"}</div>
        <div>{card.artist || "Unknown Artist"}</div>
        <div>{card.series || "Unknown Series"}</div>
      </div>
      {isAdded ? (
        <button onClick={() => removeCardFromInventory(card)}>
          Remove from Inventory
        </button>
      ) : (
        <button onClick={() => addCardToInventory(card)}>
          Add to Inventory
        </button>
      )}
    </div>
  );
}
