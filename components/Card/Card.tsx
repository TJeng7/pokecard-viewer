import { IoIosAdd, IoMdTrash } from "react-icons/io";
import { useQuery } from '@tanstack/react-query';

import styles from "./Card.module.scss"

type CardProps = {
  card: CardData;
  setModalImage: any;
  isAdded: boolean;
  addCardToWishlist: any;
  removeCardFromWishlist: any;
};

export default function Card({
  card,
  setModalImage,
  isAdded,
  addCardToWishlist,
  removeCardFromWishlist,
}: CardProps) {
  const { isPending, error, data } = useQuery({
    queryKey: ['getCardPrices', card.id],
    queryFn: () =>
      fetch('https://api.pokemontcg.io/v2/cards/' + card.id, {
        headers: {
          'X-Api-Key': process.env.X_API_KEY || '',
        },
      }).then((res) => //how to param?
        res.json(),
      ),
    staleTime: 1000 * 60 * 60 * 24 // 1 day
  });
  if (error) {
    console.error("Error fetching card prices:", error);
    return;
  }

  return (
    <div key={card.id} className={styles.card}>
      <img
        src={card.images?.small}
        alt={card.name}
        style={{ cursor: "pointer" }}
        onClick={() => setModalImage(card.images?.large || card.images?.small)}
      />
      <div className={styles.cardText}>
        <div className={styles.cardName}>{card.name || "Unknown Name"}</div>
        <div className={styles.cardDetails}>
          <div>{card.rarity || "Unknown Rarity"}</div>
          <div>{card.artist || "Unknown Artist"}</div>
          <div>{card.series || "Unknown Series"}</div>
          {/* TODO: get all prices rather than just normal */}
          { isPending ? <div>Loading...</div> : <div>{"Market price: " + (data?.data?.tcgplayer?.prices?.normal?.market ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(data?.data?.tcgplayer?.prices?.normal?.market): "unknown")}</div> } 
          { isPending ? <div>Loading...</div> : <div>{"Last Update: " + (data?.data?.tcgplayer?.updatedAt ?? "unknown")}</div> }
        </div>
      </div>
      <button
        className={`${styles.wishlistButton} ${isAdded ? styles.remove : styles.add}`}
        onClick={isAdded ? () => removeCardFromWishlist(card) : () => addCardToWishlist(card)}
      >
        {isAdded ? <IoMdTrash className={styles.wishlistIcon}/> : <IoIosAdd className={styles.wishlistIcon}/>}
      </button>
    </div>
  );
}
