import React from "react";
import Card from "./Card";

type FilterableCardListProps = {
  currPage: string;
  cardInventory: CardData[];
  cardData: CardData[];
  renderedCards: CardData[];
  setSearchFilter: any;
  setSortCategory: any;
  importCardInventory: any;
  exportCardInventory: any;
  addCardToInventory: any;
  removeCardFromInventory: any;
  setModalImage: any;
  addComment: any;
};

export default function FilterableCardList({
  currPage,
  cardInventory,
  cardData,
  renderedCards,
  setSearchFilter,
  setSortCategory,
  importCardInventory,
  exportCardInventory,
  addCardToInventory,
  removeCardFromInventory,
  setModalImage,
  addComment,
}: FilterableCardListProps) {
  const cards = renderedCards.map((card: CardData) => {
    const isAdded =
      cardInventory.filter((inventoryCard) => inventoryCard.id === card.id)
        .length > 0;
    return (
      <Card
        key={card.id}
        card={card}
        isAdded={isAdded}
        setModalImage={setModalImage}
        addCardToInventory={addCardToInventory}
        removeCardFromInventory={removeCardFromInventory}
      />
    );
  });

  return <div className="card-list">{cards}</div>;
}
