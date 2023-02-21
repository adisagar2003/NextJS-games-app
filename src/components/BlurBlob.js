import styles from "@/styles/BlurBlob.module.css";
import { useEffect, useState } from "react";

function BlurBlob() {
  const [clientY, setClientY] = useState(0);
  const [clientX, setClientX] = useState(0);

  if (process.browser) {
    document.addEventListener("mousemove", (e) => {
      setClientX(e.clientX);
      setClientY(e.clientY);
    });
  }

  return (
    <div className={styles.BlurBlobBox}>
      <div className={styles.BlurBlobBox} />
      <div
        className={styles.BlurBlob}
        style={{ position: "absolute", left: clientX, top: clientY }}
      ></div>
    </div>
  );
}

export default BlurBlob;
