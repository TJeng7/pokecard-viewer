"use client"
import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Search } from 'lucide-react';
import data from '../data.json'

const PokemonTCGApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const cardData = data.filter((card) => {
    return card.name?.toLowerCase().includes(searchTerm.toLowerCase()) || card.rarity?.toLowerCase().includes(searchTerm.toLowerCase()) || card.artist?.toLowerCase().includes(searchTerm.toLowerCase())
  })
  const [cardInventory, setCardInventory] = useState([]);

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
    const removedCards = cardInventory.filter((card) => {
      card.id !== toRemove.id
    })

    setCardInventory(removedCards)
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
            {card.id}
          </div>
        </div>
        <button onClick={() => removeCard(card)}>
          Remove from Inventory
        </button>
      </div>
    )
  })

  return (
    <div className="main">
      <input
        type="text"
        placeholder="Search for cards..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="card-list search-cards">
        {cards}
      </div>
      <h1>Inventory</h1>
      {inventoryCards.length !== 0 ? (
        <div className="card-list">
          {inventoryCards}
        </div>) : (
        <div>
          No cards in inventory lmao
        </div>
      )}
    </div>
  );
};

export default PokemonTCGApp;