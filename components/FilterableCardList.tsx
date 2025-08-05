import React from "react";
import Card from "./Card";

type FilterableCardListProps = {
  currPage: string;
  cardInventory: InventoryCard[];
  cardData: CardData[];
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
  setSearchFilter,
  setSortCategory,
  importCardInventory,
  exportCardInventory,
  addCardToInventory,
  removeCardFromInventory,
  setModalImage,
  addComment,
}: FilterableCardListProps) {
  const cards = (currPage === "Search" ? cardData : cardInventory).map(
    (card: CardData) => {
      const isAdded =
        cardInventory.filter((inventoryCard) => inventoryCard.id === card.id)
          .length > 0;
      return (
        <Card
          card={card}
          isAdded={isAdded}
          setModalImage={setModalImage}
          addCardToInventory={addCardToInventory}
          removeCardFromInventory={removeCardFromInventory}
        />
      );
    }
  );

  return (
    <div
      className="card-list search-cards"
      style={{ margin: "0 10px 0 10px", flex: 1, overflow: "auto" }}
    >
      {cards}
    </div>
  );
}
