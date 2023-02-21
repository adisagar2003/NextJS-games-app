import styles from "@/styles/GameCard.module.css";
import Link from "next/link";
import { BsBadge8K, BsBoxArrowLeft, BsBoxArrowRight } from "react-icons/bs";

function GameCard(props) {
  return (
    <div className={styles.GameCard}>
      <span className={styles.title}>{props.title}</span>
      <img src={`${props.image}`} alt="game" className={styles.gameImage} />
      <span className={styles.short_description}>
        {props.short_description}
      </span>

      <div className={styles.genre_cards}>
        <div className={styles.genre_card}>{props.genre}</div>
        <Link href={`/games/${props.id}`}>
          {" "}
          <div className={styles.genre_card}>
            <BsBoxArrowRight />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default GameCard;
