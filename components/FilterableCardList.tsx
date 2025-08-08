import React from "react";
import Card from "./Card";

type FilterableCardListProps = {
  currTab: string;
  cardWishlist: CardData[];
  cardData: CardData[];
  renderedCards: CardData[];
  setSearchFilter: any;
  setSortCategory: any;
  importCardWishlist: any;
  exportCardWishlist: any;
  addCardToWishlist: any;
  removeCardFromWishlist: any;
  setModalImage: any;
  addComment: any;
};

export default function FilterableCardList({
  currTab,
  cardWishlist,
  cardData,
  renderedCards,
  setSearchFilter,
  setSortCategory,
  importCardWishlist,
  exportCardWishlist,
  addCardToWishlist,
  removeCardFromWishlist,
  setModalImage,
  addComment,
}: FilterableCardListProps) {
  const cards = renderedCards.map((card: CardData) => {
    const isAdded =
      cardWishlist.filter((wishlistCard) => wishlistCard.id === card.id)
        .length > 0;
    return (
      <Card
        key={card.id}
        card={card}
        isAdded={isAdded}
        setModalImage={setModalImage}
        addCardToWishlist={addCardToWishlist}
        removeCardFromWishlist={removeCardFromWishlist}
      />
    );
  });

  return <div className="card-list">{cards}</div>;
}
