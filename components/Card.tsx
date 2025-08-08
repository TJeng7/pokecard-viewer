import { IoIosAdd, IoMdTrash } from "react-icons/io";

type CardProps = {
  card: CardData;
  setModalImage: any;
  isAdded: boolean;
  addCardToWishlist: any;
  removeCardFromWishlist: any;
};

export default function Card({
  card,
  setModalImage,
  isAdded,
  addCardToWishlist,
  removeCardFromWishlist,
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
          className="remove-wishlist"
          onClick={() => removeCardFromWishlist(card)}
          title="Remove from wishlist"
        >
          <IoMdTrash className="wishlist-icon" />
        </button>
      ) : (
        <button
          className="add-wishlist"
          onClick={() => addCardToWishlist(card)}
          title="Add to wishlist"
        >
          <IoIosAdd className="wishlist-icon" />
        </button>
      )}
    </div>
  );
}
