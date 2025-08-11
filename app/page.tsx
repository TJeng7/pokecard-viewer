"use client";

import React, { useState, useEffect, ChangeEvent } from "react";

import { CardFilters } from "../components/CardFilters"
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ALL_CARDS } from "../consts/setData"

import FilterableCardList from "@/components/FilterableCardList";
import { Pagination } from "@mui/material";

const PokemonTCGApp = () => {
  const [searchFilter, setSearchFilter] = useState<SearchFilter>({
    name: "",
    artist: "",
    rarity: "",
    set: "All Sets",
  });
  const [sortCategory, setSortCategory] = useState<string>("Relevance");

  const [cards, setCards] = useState<CardData[]>(ALL_CARDS);
  const [wishlistCards, setWishlistCards] = useState<CardData[]>([]);

  const [file, setFile] = useState<File | null>(null);

  // Tracks the currently opened page to determine which CardData to render
  const [currTab, setcurrTab] = useState<string>("search");
  const [favoriteArtists, setFavoriteArtists] = useState<string[]>([]);

  // On page load, read from localStorage and set wishlistCards if present
  useEffect(() => {
    const storedWishlist = localStorage.getItem("pokecard-wishlist");
    if (storedWishlist) {
      try {
        const parsedData = JSON.parse(storedWishlist);
        if (Array.isArray(parsedData)) {
          setWishlistCards(parsedData);
        }
      } catch {
      }
    }
  }, []);

  // Whenever wishlistCards changes, update localStorage
  useEffect(() => {
    localStorage.setItem("pokecard-wishlist", JSON.stringify(wishlistCards));
  }, [wishlistCards]);

  // On page load, read from localStorage and set currTab if present
  useEffect(() => {
    const savedTab = localStorage.getItem("pokecard-currTab");
    if (savedTab === "search" || savedTab === "wishlist") {
      handlecurrTabChange(savedTab);

      // Calculate the correct totalPages for the restored tab
      const relevantCards = savedTab === "search" ? ALL_CARDS : wishlistCards;
      setPaginationData({
        pageSize: 50,
        currPage: 1,
        totalPages: Math.max(1, Math.ceil(relevantCards.length / 50)),
      });
    }
  }, [currTab]); //only load on wishlistCards change

  // Pagination for current pages
  const [paginationData, setPaginationData] = useState<PaginationData>({
    pageSize: 50,
    currPage: 1,
    totalPages: Math.ceil(ALL_CARDS.length / 50),
  });

  const exportJSON = () => {
    if (wishlistCards.length === 0) { // nothing to export
      alert("Error: Wishlist is empty!");
      return;
    }

    // create file in browser
    const fileName = "pokecard-wishlist";
    const json = JSON.stringify(wishlistCards, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    // create "a" HTLM element with href to file
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    alert("Wishlist exported successfully! Check your downloads folder for a file of format pokecard-wishlist.json");

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const importJSON = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length <= 0) {
      alert("Error: No file selected or file is empty");
      return;
    } else if (e.target.files[0].type != "application/json") {
      alert("Error: File must be a valid JSON file");
      return;
    } else {
      const selectedFile = e.target.files[0];

      setFile(selectedFile);
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const uploadData = event.target?.result as string;
          const parsedData = JSON.parse(uploadData);
          if (Array.isArray(parsedData)) {
            if (parsedData.length === 0) {
              alert("Error: File is empty!");
              return;
            } else {
              setWishlistCards(parsedData);
              alert("File uploaded successfully! Wishlist has been overwritten.");
            }
          }
        } catch (error) {}
      };
      reader.readAsText(selectedFile);
    }
  };

  const filteredSearchCards = filterCards("search");
  const filteredWishlistCards = filterCards("wishlist");

  const paginatedCards =
    currTab === "search"
      ? filteredSearchCards.slice(
          (paginationData.currPage - 1) * paginationData.pageSize,
          paginationData.currPage * paginationData.pageSize
        )
      : filteredWishlistCards.slice(
          (paginationData.currPage - 1) * paginationData.pageSize,
          paginationData.currPage * paginationData.pageSize
        );

  const [modalImage, setModalImage] = useState<string | null>(null);

  function filterCards(view: string) {
    const toFilter = view === "search" ? cards : wishlistCards;
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

  function addCardToWishlist(toAdd: CardData) {
    if (wishlistCards.filter((card) => card.id === toAdd.id).length > 0) {
      return;
    } else {
      setWishlistCards([...wishlistCards, toAdd]);
    }
  }

  function removeCardFromWishlist(toRemove: CardData) {
    const removedCards = wishlistCards.filter(
      (card) => card.id !== toRemove.id
    );
    setWishlistCards(removedCards);
  }

  function importCardWishlist() {}

  function exportCardWishlist() {}

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
        (currTab === "search" ? filteredSearchCards : filteredWishlistCards)
          .length / 50
      ),
    });

    const element = document.getElementsByClassName("card-list")[0];
    element?.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [searchFilter]);

  function handlecurrTabChange(tab: string) {
    setcurrTab(tab);
    localStorage.setItem("pokecard-currTab", tab); // Save to localStorage
    setPaginationData({
      pageSize: 50,
      currPage: 1,
      totalPages: Math.ceil(
        (tab === "search" ? cards : wishlistCards).length / 50
      ),
    });
  }

  return (
    <div className="main vertical-layout">
      <Header
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
        currTab={currTab}
        handleCurrTabChange={handlecurrTabChange}
      />
      <div className="body">
        <CardFilters 
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
        />
        <FilterableCardList
          currTab={currTab}
          cardWishlist={wishlistCards}
          cardData={cards}
          renderedCards={paginatedCards}
          setSearchFilter={setSearchFilter}
          setSortCategory={setSortCategory}
          importCardWishlist={importCardWishlist}
          exportCardWishlist={exportCardWishlist}
          addCardToWishlist={addCardToWishlist}
          removeCardFromWishlist={removeCardFromWishlist}
          setModalImage={setModalImage}
          addComment={addComment}
        />
        <div className="pagination">
          <Pagination
            count={paginationData.totalPages}
            onChange={handlePageChange}
            page={paginationData.currPage}
            sx={{
              ".MuiButtonBase-root-MuiPaginationItem-root": {
                color: "#f6f5ed",
              },
            }}
          />
        </div>
        <Footer 
          onImportJSON = {(e) => importJSON(e)}
          onExportJSON = {exportJSON}
        />
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
