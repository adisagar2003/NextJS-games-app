import styles from "@/styles/Navbar.module.css";
import Link from "next/link";
import Logo from "./Logo";

function Navbar(props, setSignInModal) {
  return (
    <div className={styles.layout}>
      <Link href="/">
        <div className={styles.heading}>
          <Logo width="60" height="60" />
        </div>
      </Link>
      <div className={styles.links}>
        <Link href="#" onClick={() => props.setSignInModal(true)}>
          Sign In
        </Link>

        <Link href="/about">About</Link>
        <Link href="/topGames">Features</Link>
      </div>
    </div>
  );
}

export default Navbar;
