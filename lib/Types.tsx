// Defines any types needed

type CardData = {
  id: string;
  name: string;
  artist: string;
  rarity: string;
  images: {
    small: string;
    large: string;
  };
  series: string;
};

type CardComment = {
  comment: string;
  date: Date;
  commentor: string;
};

type InventoryCard = {
  id: string;
  name: string;
  artist: string;
  rarity: string;
  images: {
    small: string;
    large: string;
  };
  series: string;
  comments: CardComment[];
};

type SearchTerm = {
  name: string;
  artist: string;
  rarity: string;
  set: string;
};
