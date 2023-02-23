import BlurBlob from "@/components/BlurBlob";
import Navbar from "@/components/Navbar";
import SignInModal from "@/components/SignInModal";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
function about() {
  const [signInModal, setSignInModal] = useState(false);

  return (
    <div>
      {signInModal && <SignInModal setSignInModal={setSignInModal} />}
      <BlurBlob />
      <Navbar setSignInModal={setSignInModal} />
      <div className={styles.Heading}>Best Site for free games</div>
      <div className={styles.techStack}>
        <div className={styles.Heading}>Tech Stack Used</div>
        <ul>
          <li>MongoDB</li>
          <li>NextJS</li>
          <li>Framer Motion</li>
        </ul>
      </div>
    </div>
  );
}

export default about;
