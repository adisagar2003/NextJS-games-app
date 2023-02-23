import { useState } from "react";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/Navbar";
import BlurBlob from "@/components/BlurBlob";
import { motion, Variants } from "framer-motion";
import SignInModal from "@/components/SignInModal";

const inter = Inter({ subsets: ["latin"] });


import { withIronSessionSsr } from "iron-session/next";

export default function Home(props) {
  const [signInModal, setSignInModal] = useState(false);
  console.log(props.user, "props.user");
  const cardVariants = {
    offscreen: {
      y: 300,
    },
    onscreen: {
      y: 50,
      rotate: -10,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };
  return (
    <>
      {signInModal && <SignInModal setSignInModal={setSignInModal} />}
      <BlurBlob />
      <Navbar setSignInModal={setSignInModal} user={props.user} />
      <div className={styles.layout}>
        <motion.div
          whileHover={{ opacity: 1.2 }}
          onHoverStart={(e) => {}}
          onHoverEnd={(e) => {}}
          className={styles.GameImages}
        >
          <img src="https://rare-gallery.com/uploads/posts/5299958-computer-arcade-gaming-pinball-classic-game-frogger-arcade-game-light-dark-moody-blue-colour-night-red-game-retro-neon-public-domain-images.jpg" />
        </motion.div>
        <div className={styles.Heading}>
          {" "}
          latest products and updates in the gaming industry
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
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

