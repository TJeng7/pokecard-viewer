import base from "../public/data/base.json";
import bw from "../public/data/bw.json";
import dp from "../public/data/dp.json";
import ex from "../public/data/ex.json";
import pop from "../public/data/pop.json";
import sm from "../public/data/sm.json";
import sv from "../public/data/sv.json";
import swsh from "../public/data/swsh.json";
import xy from "../public/data/xy.json";

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
];

export const SET_OPTIONS: SetOption[] = [
  { label: "Scarlet & Violet", data: sv },
  { label: "Sword & Shield", data: swsh },
  { label: "Sun & Moon", data: sm },
  { label: "X & Y", data: xy },
  { label: "Black & White", data: bw },
  { label: "Diamond & Pearl", data: dp },
  { label: "Pop Series", data: pop },
  { label: "EX", data: ex },
  { label: "Base Set", data: base },
  { label: "All Series", data: ALL_CARDS },
];
