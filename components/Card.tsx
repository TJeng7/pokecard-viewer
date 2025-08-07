import { IoIosAdd, IoMdTrash } from "react-icons/io";

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
      <div className="card-text">
        <div className="card-name">{card.name || "Unknown Name"}</div>
        <div className="card-details">
          <div>{card.rarity || "Unknown Rarity"}</div>
          <div>{card.artist || "Unknown Artist"}</div>
          <div>{card.series || "Unknown Series"}</div>
        </div>
      </div>
      {isAdded ? (
        <button
          className="remove-inventory"
          onClick={() => removeCardFromInventory(card)}
          title="Remove from inventory"
        >
          <IoMdTrash className="inventory-icon" />
        </button>
      ) : (
        <button
          className="add-inventory"
          onClick={() => addCardToInventory(card)}
          title="Add to inventory"
        >
          <IoIosAdd className="inventory-icon" />
        </button>
      )}
    </div>
  );
}
