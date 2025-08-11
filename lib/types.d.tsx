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
  set: string | null;
};

type CardComment = {
  comment: string;
  date: Date;
  commentor: string;
};

type SearchFilter = {
  name: string;
  artist: string;
  rarity: string;
  series: string;
};

type SetOption = {
  label: string;
  data: CardData[];
};

type PaginationData = {
  pageSize: number;
  currPage: number;
  totalPages: number;
};
