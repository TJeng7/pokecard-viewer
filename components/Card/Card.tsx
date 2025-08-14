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

function displayPrices(tcgplayerData: any) {
  if (!tcgplayerData) {
    return null;
  }

  return (
    <div> 
      {Object.entries(tcgplayerData.prices).map(([priceType, priceData]) => (
        <div className={styles.priceText} key={priceType}>
          <p> 
            <a href={tcgplayerData.url} target="_blank">
            <b>{priceType}</b>
            {` - $${priceData.market || "N/A"}`}
            </a>
          </p>
          <div className={styles.priceTip}>
            <h3>{priceType}</h3>
            {priceData.low ? <p>Low: ${priceData.low}</p> : <p></p>} 
            {priceData.mid ? <p>Mid: ${priceData.mid}</p> : <p></p>} 
            {priceData.high ? <p>High: ${priceData.high}</p> : <p></p>} 
            {priceData.market ? <p>Market: ${priceData.market}</p> : <p></p>} 
            {priceData.directLow ? <p>Direct Low: ${priceData.directLow}</p> : <p></p>} 
            {<div className={styles.lastUpdatedText}>{"Last Update: " + (tcgplayerData?.updatedAt ?? "unknown")}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

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
        <div className={styles.cardContainer}>
          <div className={styles.cardDetails}>
            { isPending ? <div>Loading...</div> : <div>{(displayPrices(data?.data?.tcgplayer) ? displayPrices(data?.data?.tcgplayer) : "unknown prices")}</div> } 
            {/* <div>{card.rarity || "Unknown Rarity"}</div> */}
            <div>{card.artist || "Unknown Artist"}</div>
            <div className={styles.series}>{card.series || "Unknown Series"}</div>
          </div>
          <button
            className={`${styles.wishlistButton} ${isAdded ? styles.remove : styles.add}`}
            onClick={isAdded ? () => removeCardFromWishlist(card) : () => addCardToWishlist(card)}
          >
            {isAdded ? <IoMdTrash className={styles.wishlistIcon}/> : <IoIosAdd className={styles.wishlistIcon}/>}
          </button>
        </div>
        
      </div>

    </div>
  );
}
