import { useState } from "react";
import { CiSearch } from "react-icons/ci";

import styles from "./Header.module.scss"

interface Props {
    searchFilter: SearchFilter;
    setSearchFilter: (filter: SearchFilter) => void;
    currTab: string;
    handleCurrTabChange: (tab:string) => void;
}

export const Header: React.FC<Props> = ({ searchFilter, setSearchFilter, currTab, handleCurrTabChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
  <div className={styles.header}>
    <div className={styles.headerSearch}>
      <h1>Pokecard Viewer</h1>
      <div className={styles.search}>
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
          className={styles.searchBar}
        />
        <CiSearch
          className={styles.searchIcon}
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
    <div className={styles.tabs}>
      <button
        className={`${styles.tabButton} ${currTab === "search" ? styles.selected : ""}`}
        onClick={() => handleCurrTabChange("search")}
      >
        Search
      </button>
      <button
        className={`${styles.tabButton} ${currTab === "wishlist" ? styles.selected : ""}`}
        onClick={() => handleCurrTabChange("wishlist")}
      >
        Wishlist
      </button>
    </div>
  </div>);
};