import { useState } from "react";
import { CiSearch } from "react-icons/ci";

interface Props {
    searchFilter: SearchFilter;
    setSearchFilter: (filter: SearchFilter) => void;
    currTab: string;
    handleCurrTabChange: (tab:string) => void;
}

export const Header: React.FC<Props> = ({ searchFilter, setSearchFilter, currTab, handleCurrTabChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
  <div className="header">
    <div className="header-search">
      <h1>Pokecard Viewer</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search for cards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchFilter({
                name: searchTerm,
                artist: searchFilter.artist,
                rarity: searchFilter.rarity,
                set: searchFilter.set,
              });
            }
          }}
          className="search-bar"
        />
        <CiSearch
          className="search-icon"
          onClick={() => {
            setSearchFilter({
              name: searchTerm,
              artist: searchFilter.artist,
              rarity: searchFilter.rarity,
              set: searchFilter.set,
            });
          }}
        />
      </div>
    </div>
    <div className="tabs">
      <button
        className={`tab-button ${currTab === "search" ? "selected" : ""}`}
        onClick={() => handleCurrTabChange("search")}
      >
        Search
      </button>
      <button
        className={`tab-button ${
          currTab === "wishlist" ? "selected" : ""
        }`}
        onClick={() => handleCurrTabChange("wishlist")}
      >
        Wishlist
      </button>
    </div>
  </div>);
};