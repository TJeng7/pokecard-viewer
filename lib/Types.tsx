// Defines any types needed

type CardData = {
  id: string;
  name: string;
  artist: string | null;
  rarity: string | null;
  images: {
    small: string;
    large: string;
  };
  series: string | null;
};

type CardComment = {
  comment: string;
  date: Date;
  commentor: string;
};

type InventoryCard = {
  id: string;
  name: string;
  artist: string | null;
  rarity: string | null;
  images: {
    small: string;
    large: string;
  };
  series: string | null;
  comments: CardComment[];
};

type SearchTerm = {
  name: string;
  artist: string;
  rarity: string;
  set: string;
};

type SetOption = {
  label: string;
  data: CardData[];
};
