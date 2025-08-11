type CardData = {
  id: string;
  name: string;
  artist: string | null | undefined;
  rarity: string | null | undefined;
  images: {
    small: string;
    large: string;
  };
  series: string | null | undefined;
  set: string | null | undefined;
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
  set: string;
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