"use client";

import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import base from "../public/data/base.json";
import bw from "../public/data/bw.json";
import dp from "../public/data/dp.json";
import ex from "../public/data/ex.json";
import pop from "../public/data/pop.json";
import sm from "../public/data/sm.json";
import sv from "../public/data/sv.json";
import swsh from "../public/data/swsh.json";
import xy from "../public/data/xy.json";

import FilterableCardList from "@/components/FilterableCardList";

const allCards: CardData[] = [
  ...base,
  ...bw,
  ...dp,
  ...ex,
  ...pop,
  ...sm,
  ...sv,
  ...swsh,
  ...xy,
];

const setOptions: SetOption[] = [
  { label: "Scarlet & Violet", data: sv },
  { label: "Sword & Shield", data: swsh },
  { label: "Sun & Moon", data: sm },
  { label: "X & Y", data: xy },
  { label: "Black & White", data: bw },
  { label: "Diamond & Pearl", data: dp },
  { label: "Pop Series", data: pop },
  { label: "EX", data: ex },
  { label: "Base Set", data: base },
  { label: "All Sets", data: allCards },
];

const PokemonTCGApp = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchFilter, setSearchFilter] = useState<SearchFilter>({
    artist: "",
    rarity: "",
    set: setOptions[0].label,
  });
  const [sortCategory, setSortCategory] = useState<string>("Relevance");

  const [cardData, setCardData] = useState<CardData[]>(sv);
  const [cardInventory, setCardInventory] = useState<InventoryCard[]>([]);
  // TO DO: Replace with new state
  const [inventoryOpen, setInventoryOpen] = useState<boolean>(true);

  // Tracks the currently opened page to determine which CardData to render
  const [currPage, setCurrPage] = useState<string>("Search");
  const [favoriteArtists, setFavoriteArtists] = useState<string[]>([]);

  const [modalImage, setModalImage] = useState<string | null>(null);

  // TO DO: Change to filter the correct data set based on currently opened page
  function filterData() {
    const selectedSetData: CardData[] = setOptions.filter((set) => {
      return set.label === searchFilter.set;
    })[0].data;

    const filteredData: CardData[] = selectedSetData.filter((card) => {
      const nameMatch =
        searchTerm === "" ||
        card.name.toLowerCase().includes(searchTerm.toLowerCase());
      const artistMatch =
        searchFilter.artist === "" ||
        card.artist?.toLowerCase().includes(searchFilter.artist.toLowerCase());
      const rarityMatch =
        searchFilter.rarity === "" ||
        card.rarity?.toLowerCase().includes(searchFilter.rarity.toLowerCase());

      if (nameMatch && artistMatch && rarityMatch) {
        return card;
      }
    });

    setCardData(filteredData);
  }

  function addCardToInventory(toAdd: CardData) {
    if (cardInventory.filter((card) => card.id === toAdd.id).length > 0) {
      return;
    } else {
      setCardInventory([...cardInventory, { ...toAdd, comments: [] }]);
    }
  }

  function removeCardFromInventory(toRemove: CardData) {
    const removedCards = cardInventory.filter(
      (card) => card.id !== toRemove.id
    );
    setCardInventory(removedCards);
  }

  function importCardInventory() {}

  function exportCardInventory() {}

  function addComment() {}

  const inventoryCards = cardInventory.map((card) => {
    return (
      <div key={card.id} className="card">
        <img
          src={card.images?.small}
          alt={card.name}
          style={{ cursor: "pointer" }}
          onClick={() =>
            setModalImage(card.images?.large || card.images?.small)
          }
        />
        <div className="card-details">
          <div className="card-name">{card.name || "Unknown Name"}</div>
          <div>{card.rarity || "Unknown Rarity"}</div>
          <div>{card.artist || "Unknown Artist"}</div>
          <div>{card.series || "Unknown Series"}</div>
        </div>
        <button onClick={() => removeCardFromInventory(card)}>
          Remove from Inventory
        </button>
      </div>
    );
  });

  return (
    <div className="main vertical-layout">
      <div className="header">
        <h1>Pokecard Viewer</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Search for cards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          <select
            value={searchFilter.set}
            onChange={(e) =>
              setSearchFilter({
                artist: searchFilter.artist,
                rarity: searchFilter.rarity,
                set: e.target.value,
              })
            }
            className="dropdown"
          >
            {setOptions.map((opt) => (
              <option key={opt.label} value={opt.label}>
                {opt.label}
              </option>
            ))}
          </select>
          <button onClick={() => filterData()}>Search</button>
        </div>
      </div>
      <FilterableCardList
        cardInventory={cardInventory}
        cardData={cardData}
        setSearchFilter={setSearchFilter}
        setSortCategory={setSortCategory}
        importCardInventory={importCardInventory}
        exportCardInventory={exportCardInventory}
        addCardToInventory={addCardToInventory}
        removeCardFromInventory={removeCardFromInventory}
        setModalImage={setModalImage}
        addComment={addComment}
      />
      <div className={`inventory-panel${inventoryOpen ? "" : " closed"}`}>
        <button
          className="inventory-toggle"
          onClick={() => setInventoryOpen((open) => !open)}
          style={{ marginBottom: "8px" }}
        >
          {inventoryOpen ? "Hide Inventory" : "Show Inventory"}
        </button>
        <div
          className="inventory-content"
          style={{ display: inventoryOpen ? "block" : "none" }}
        >
          <h1>Inventory</h1>
          {inventoryCards.length !== 0 ? (
            <>
              <Divider
                variant="middle"
                style={{
                  margin: "12px 0",
                  borderColor: "white",
                  backgroundColor: "white",
                  color: "white",
                }}
              />
              <div className="card-list">{inventoryCards}</div>
            </>
          ) : (
            <div>No cards in inventory lmao</div>
          )}
        </div>
      </div>
      {modalImage && (
        <div className="modal-image" onClick={() => setModalImage(null)}>
          <img
            src={modalImage}
            alt="Large Card"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default PokemonTCGApp;
