"use client";

import React, { useState, useEffect } from "react";
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
import { Pagination } from "@mui/material";

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
    name: "",
    artist: "",
    rarity: "",
    set: setOptions[0].label,
  });
  const [sortCategory, setSortCategory] = useState<string>("Relevance");

  const [cards, setCards] = useState<CardData[]>(allCards);
  const [inventoryCards, setInventoryCards] = useState<CardData[]>([]);

  // Tracks the currently opened page to determine which CardData to render
  const [currPage, setCurrPage] = useState<string>("search");
  const [favoriteArtists, setFavoriteArtists] = useState<string[]>([]);

  // Pagination for current pages
  const [paginationData, setPaginationData] = useState<PaginationData>({
    pageSize: 50,
    currPage: 1,
    totalPages: Math.ceil(sv.length / 50),
  });

  const filteredSearchCards = filterCards("search");
  const filteredInventoryCards = filterCards("inventory");

  const paginatedCards =
    currPage === "search"
      ? filteredSearchCards.slice(
          (paginationData.currPage - 1) * paginationData.pageSize,
          paginationData.currPage * paginationData.pageSize
        )
      : filteredInventoryCards.slice(
          (paginationData.currPage - 1) * paginationData.pageSize,
          paginationData.currPage * paginationData.pageSize
        );

  const [modalImage, setModalImage] = useState<string | null>(null);

  function filterCards(view: string) {
    const toFilter = view === "search" ? cards : inventoryCards;
    const selectedSetData: CardData[] =
      searchFilter.set === "All Sets"
        ? toFilter
        : toFilter.filter((card) => {
            return card.set === searchFilter.set;
          });
    const filteredSetData: CardData[] = selectedSetData.filter((card) => {
      const nameMatch =
        searchFilter.name === "" ||
        card.name.toLowerCase().includes(searchFilter.name.toLowerCase());
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

    return filteredSetData;
  }

  function addCardToInventory(toAdd: CardData) {
    if (inventoryCards.filter((card) => card.id === toAdd.id).length > 0) {
      return;
    } else {
      setInventoryCards([...inventoryCards, toAdd]);
    }
  }

  function removeCardFromInventory(toRemove: CardData) {
    const removedCards = inventoryCards.filter(
      (card) => card.id !== toRemove.id
    );
    setInventoryCards(removedCards);
  }

  function importCardInventory() {}

  function exportCardInventory() {}

  function addComment() {}

  function handlePageChange(
    event: React.ChangeEvent<unknown> | null,
    page: number
  ) {
    setPaginationData({
      ...paginationData,
      currPage: page,
    });

    const element = document.getElementsByClassName("card-list")[0];
    element?.scroll({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    setPaginationData({
      ...paginationData,
      currPage: 1,
      totalPages: Math.ceil(
        (currPage === "search" ? filteredSearchCards : filteredInventoryCards)
          .length / 50
      ),
    });

    const element = document.getElementsByClassName("card-list")[0];
    element?.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [searchFilter]);

  function handleCurrPageChange(page: string) {
    setCurrPage(page);
    setPaginationData({
      pageSize: 50,
      currPage: 1,
      totalPages: Math.ceil(
        (page === "search" ? cards : inventoryCards).length / 50
      ),
    });
  }

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
            onChange={(e) => {
              setSearchFilter({
                name: searchFilter.name,
                artist: searchFilter.artist,
                rarity: searchFilter.rarity,
                set: e.target.value,
              });
            }}
            className="dropdown"
          >
            {setOptions.map((opt) => (
              <option key={opt.label} value={opt.label}>
                {opt.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setSearchFilter({
                name: searchTerm,
                artist: searchFilter.artist,
                rarity: searchFilter.rarity,
                set: searchFilter.set,
              });
            }}
          >
            Search
          </button>
        </div>
        <div className="pages">
          <button
            className="page-button"
            onClick={() => handleCurrPageChange("search")}
          >
            Search
          </button>
          <button
            className="page-button"
            onClick={() => handleCurrPageChange("inventory")}
          >
            Inventory
          </button>
        </div>
      </div>
      <FilterableCardList
        currPage={currPage}
        cardInventory={inventoryCards}
        cardData={cards}
        renderedCards={paginatedCards}
        setSearchFilter={setSearchFilter}
        setSortCategory={setSortCategory}
        importCardInventory={importCardInventory}
        exportCardInventory={exportCardInventory}
        addCardToInventory={addCardToInventory}
        removeCardFromInventory={removeCardFromInventory}
        setModalImage={setModalImage}
        addComment={addComment}
      />
      <Pagination
        count={paginationData.totalPages}
        onChange={handlePageChange}
        page={paginationData.currPage}
      />
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
