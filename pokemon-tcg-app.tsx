import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Search } from 'lucide-react';

const PokemonTCGApp = () => {
  const [cards, setCards] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Fetch cards from the API
  const fetchCards = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.pokemontcg.io/v2/cards?pageSize=20');
      if (!response.ok) {
        throw new Error('Failed to fetch cards');
      }
      const data = await response.json();
      setCards(data.data || []);
      setAllCards(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // Remove a card from the table
  const removeCard = (cardId) => {
    const updatedCards = cards.filter(card => card.id !== cardId);
    setCards(updatedCards);
  };

  // Add a card back to the table (from removed cards)
  const addCard = (cardToAdd) => {
    if (!cards.find(card => card.id === cardToAdd.id)) {
      setCards([...cards, cardToAdd]);
    }
    setShowAddModal(false);
  };

  // Get cards that have been removed (available to add back)
  const removedCards = allCards.filter(card => !cards.find(c => c.id === card.id));

  // Filter cards based on search
  const filteredCards = cards.filter(card => 
    card.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.set?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.types?.some(type => type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Pokémon cards...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={fetchCards}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Pokémon TCG Card Manager
        </h1>

        {/* Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search cards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            disabled={removedCards.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            Add Card ({removedCards.length})
          </button>
        </div>

        {/* Stats */}
        <div className="mb-4 text-center text-gray-600">
          Showing {filteredCards.length} of {cards.length} cards
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Set
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Types
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rarity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCards.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      {searchTerm ? 'No cards match your search.' : 'No cards available.'}
                    </td>
                  </tr>
                ) : (
                  filteredCards.map((card) => (
                    <tr key={card.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={card.images?.small || '/api/placeholder/60/84'}
                          alt={card.name}
                          className="w-12 h-16 object-cover rounded border"
                          onError={(e) => {
                            e.target.src = '/api/placeholder/60/84';
                          }}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {card.name || 'Unknown'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {card.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {card.set?.name || 'Unknown Set'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {card.number}/{card.set?.total || '?'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {card.types?.map((type, index) => (
                            <span
                              key={index}
                              className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded"
                            >
                              {type}
                            </span>
                          )) || <span className="text-gray-500 text-sm">No types</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded">
                          {card.rarity || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => removeCard(card.id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                          title="Remove card"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Card Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Add Card Back</h2>
                <p className="text-sm text-gray-600">Select a card to add back to the table</p>
              </div>
              <div className="p-4 overflow-y-auto max-h-64">
                {removedCards.length === 0 ? (
                  <p className="text-center text-gray-500">No removed cards available</p>
                ) : (
                  <div className="space-y-2">
                    {removedCards.map((card) => (
                      <div
                        key={card.id}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        onClick={() => addCard(card)}
                      >
                        <img
                          src={card.images?.small || '/api/placeholder/40/56'}
                          alt={card.name}
                          className="w-8 h-11 object-cover rounded border"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{card.name}</div>
                          <div className="text-xs text-gray-500">{card.set?.name}</div>
                        </div>
                        <Plus className="w-4 h-4 text-green-600" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-4 border-t flex justify-end">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonTCGApp;