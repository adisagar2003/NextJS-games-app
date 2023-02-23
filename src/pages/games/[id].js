import BlurBlob from "@/components/BlurBlob";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import styles from "@/styles/Game.module.css";
import { motion } from "framer-motion";
import { withIronSessionSsr } from "iron-session/next";
import SignInModal from "@/components/SignInModal";

import Link from "next/link";
export default function Game(props) {
  const [signInModal, setSignInModal] = useState(false);
  const router = useRouter();

  const { id } = router.query;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(`/api/games/${id}`, fetcher);

  console.log(data);
  return (
    <div>
      {signInModal && <SignInModal setSignInModal={setSignInModal} />}

      {!isLoading && !error && data != undefined && (
        <div>
          <Navbar signInDisabled={false} user={props.user} />
          <BlurBlob />
          <div className={styles.container}>
            <div className={styles.layout}>
              <div className={styles.headingLayout}>
                <motion.h1>
                  {data.Game.title}
                  <p className={styles.desc}>{data.Game.short_description}</p>
                </motion.h1>
                <div className={styles.thumbnail}>
                  <img src={data.Game.thumbnail} />
                  <p>{data.Game.developer}</p>
                </div>
              </div>

              <div className={styles.buttons}>
                <button>{data.Game.genre}</button>
                <Link target="_blank" href={`${data.Game.game_url}`}>
                  <button>Redirect</button>
                </Link>
                <button>({data.Game.platform.split(" ")[0]})</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && !data && <div className="">Error</div>}
    </div>
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

