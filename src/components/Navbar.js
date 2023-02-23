import { useState } from "react";
import styles from "@/styles/Navbar.module.css";
import Link from "next/link";
import Logo from "./Logo";
import cx from "classnames";
import { withIronSessionSsr } from "iron-session/next";
import { BsPerson } from "react-icons/bs";
import { motion } from "framer-motion";
import { Cookies, useCookies } from "react-cookie";

export default function Navbar(props, setSignInModal) {
  const [dropdown, setDropdown] = useState(false);
  const [removeCookie] = useCookies(["access_token"]);
  console.log(props);
  return (
    <div className={styles.layout}>
      <Link href="/">
        <div className={styles.heading}>
          <Logo width="60" height="60" />
        </div>
      </Link>
      <div className={styles.links}>
        {props.user ? (
          <div className={styles.avatarLayout}>
            <img
              src={`${props.user.profile_picture}`}
              onClick={() => setDropdown(!dropdown)}
            />

            {dropdown && (
              <motion.div
                className={`${cx(styles.dropdown)}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.1 }}
              >
                <a>
                  <BsPerson />
                  Profile
                </a>

                <a>{props.user.email}</a>
                <a
                  onClick={async () => {
                    await fetch("/api/logout");
                    removeCookie[("access_token", { path: "" })];
                    document.cookie = "access_token=14134;SameSite=Lax;path=/"; // removed!
                    location.reload();
                  }}
                >
                  Logout
                </a>
              </motion.div>
            )}
          </div>
        ) : (
          <Link href="#" onClick={() => props.setSignInModal(true)}>
            Sign In
          </Link>
        )}
        <Link href="/about">About</Link>
        <Link href="/register">Register</Link>
        <Link href="/topGames">Games</Link>
      </div>
    </div>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    console.log("user", user);
    if (!user) {
      return {
        props: {
          user: false,
        },
      };
    }
    return {
      props: {
        user: req.session.user,
      },
    };
  },
  {
    cookieName: "access_token",
    password: process.env.NEXT_PUBLIC_COOKIE_SECRET,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);
