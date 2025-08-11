import {
  base, bw, dp, ex, pop, sm, sv, swsh, xy, ecard, gym, hgss, neo, np, pl, other
} from "../app/index.js";

export const ALL_CARDS: CardData[] = [
  ...base,
  ...bw,
  ...dp,
  ...ex,
  ...pop,
  ...sm,
  ...sv,
  ...swsh,
  ...xy,
  ...ecard, 
  ...gym, 
  ...hgss, 
  ...neo, 
  ...np, 
  ...pl, 
  ...other
];

export const SET_OPTIONS: string[] = [
  "Scarlet & Violet",
  "Sword & Shield", 
  "Sun & Moon", 
  "X & Y", 
  "Black & White", 
  "Diamond & Pearl", 
  "Pop Series", 
  "EX", 
  "Base Set", 
  "E-Card", 
  "Gym", 
  "HeartGold & SoulSilver", 
  "Neo",
  "NP", 
  "Platinum", 
  "Other", 
  "All Sets"];
