import styles from "@/styles/TopGames.module.css";
import SignInModal from "@/components/SignInModal";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import BlurBlob from "@/components/BlurBlob";
import GameCard from "@/components/GameCard";
import Pagination from "@/components/Pagination";
import ClipLoader from "react-spinners/ClipLoader";
import useSWR from "swr";
function topGames({ games }) {
  const [signInModal, setSignInModal] = useState(false);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR("/api/games", fetcher);
  if (isLoading == false && error) {
    console.log(data.data);
  }

  return (
    <div>
      <Navbar setSignInModal={setSignInModal} />
      <div className={styles.layout}>
        {signInModal && <SignInModal setSignInModal={setSignInModal} />}
        <BlurBlob />

        <Pagination className={styles.grid_layout}>
          {/* {games.map((game) => {
            <GameCard
              title={game.title}
              image={game.thumbnail}
              short_description={game.short_description}
            />;
          })} */}
          {isLoading && (
            <ClipLoader
              color={"#ffffff"}
              loading={isLoading}
              cssOverride={false}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}

          {error && (
            <div className="">
              <BlurBlob></BlurBlob>
              <h1>Error!</h1>
            </div>
          )}

          {!isLoading && error
            ? null
            : data?.data.map((game) => {
                return (
                  <GameCard
                    title={game.title}
                    id={game._id}
                    image={game.thumbnail}
                    short_description={game.short_description}
                    genre={game.genre}
                  />
                );
              })}
        </Pagination>
      </div>
    </div>
  );
}

export default topGames;
