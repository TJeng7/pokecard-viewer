"use client"
import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Search } from 'lucide-react';
import data from '../data.json'
import Divider from '@mui/material/Divider';

const PokemonTCGApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const cardData = data.filter((card) => {
    return card.name?.toLowerCase().includes(searchTerm.toLowerCase()) || card.rarity?.toLowerCase().includes(searchTerm.toLowerCase()) || card.artist?.toLowerCase().includes(searchTerm.toLowerCase())
  })
  const [cardInventory, setCardInventory] = useState([]);
  const [inventoryOpen, setInventoryOpen] = useState(true);

  function addCard(toAdd) {
    // Don't add card if already added
    if (cardInventory.filter((card) => card.id === toAdd.id).length > 0) {
      return
    } else {
      setCardInventory(
        [
          ...cardInventory,
          toAdd
        ]
      )
    }
  }

  function removeCard(toRemove) {
    const removedCards = cardInventory.filter((card) => card.id !== toRemove.id);
    setCardInventory(removedCards);
  }

  const cards = cardData.map((card) => {
    const isAdded = cardInventory.filter((inventoryCard) => inventoryCard.id === card.id).length > 0
    return (
      <div key={card.id} className="card">
        <img
            src={card.images?.small}
            alt={card.name}
          />
        <div className="card-details">
          <div className="card-name">
            {card.name || 'Unknown'}
          </div>
          <div>
            {card.rarity || 'Unknown'}
          </div>
          <div>
            {card.artist || 'Unknown'}
          </div>
        </div>
        {isAdded ?
          <button onClick={() => removeCard(card)}>
            Remove from Inventory
          </button>
        :
          <button onClick={() => addCard(card)}>
            Add to Inventory
          </button>
        }
      </div>
    )
  })

  const inventoryCards = cardInventory.map((card) => {
    return (
      <div key={card.id} className="card">
        <img
            src={card.images?.small}
            alt={card.name}
          />
        <div className="card-details">
          <div className="card-name">
            {card.name || 'Unknown'}
          </div>
          <div>
            {card.rarity || 'Unknown'}
          </div>
          <div>
            {card.artist || 'Unknown'}
          </div>
        </div>
        <button onClick={() => removeCard(card)}>
          Remove from Inventory
        </button>
      </div>
    )
  })

  return (
  <div className="main vertical-layout">
    <h1 style={{ fontSize: '2.5rem', textAlign: 'left', margin: '0 10px 0 10px' }}>Pokecard Viewer</h1>
    <input
      type="text"
      placeholder="Search for cards..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ width: '500px', textAlign: 'left', fontSize: '1.2rem', margin: '0 10px 0 10px', display: 'block' }}
    />
    <div className="card-list search-cards" style={{ margin: '0 10px 0 10px', flex: 1, overflow: 'auto' }}>
      {cards}
    </div>
    <div className={`inventory-panel${inventoryOpen ? '' : ' closed'}`}>
      <button
        className="inventory-toggle"
        onClick={() => setInventoryOpen((open) => !open)}
        style={{ marginBottom: '8px' }}
      >
        {inventoryOpen ? 'Hide Inventory' : 'Show Inventory'}
      </button>
      <div className="inventory-content" style={{ display: inventoryOpen ? 'block' : 'none' }}>
        <h1>Inventory</h1>
        {inventoryCards.length !== 0 ? (
          <>
            <Divider variant="middle" style={{ margin: '12px 0', borderColor: 'white', backgroundColor: 'white', color: 'white' }} />
            <div className="card-list">
              {inventoryCards}
            </div>
          </>
        ) : (
          <div>
            No cards in inventory lmao
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default PokemonTCGApp;