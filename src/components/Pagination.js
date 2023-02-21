import React, { useEffect, useState } from "react";
import Button from "./Button";
import styles from "@/styles/Pagination.module.css";
import { motion } from "framer-motion";
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs";
function Pagination({ children, className }) {
  const [currentPage, setCurrentPage] = useState(0);
  let totalElements = children.length;
  let totalPages = Math.ceil(totalElements / 6);

  useEffect(() => {
    console.log("hello");
    console.log({ totalPages, currentPage });
  }, [currentPage]);
  const increasePage = () => {
    console.log("nest");
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);

      console.log(currentPage);
    } else {
      setCurrentPage(0);
    }
  };
  const decreasePage = () => {
    console.log("DecreasePage");
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      console.log(currentPage);
    }
  };

  return (
    <motion.div
      className={className}
      animate={{
        opacity: [0, 1],
      }}
    >
      {children.slice(currentPage * 6, (currentPage + 1) * 6)}

      <div className={styles.buttonLayout}>
        <button onClick={() => decreasePage()} className={styles.button}>
          <BsArrowLeftCircleFill />
        </button>
        <button
          onClick={() => increasePage()}
          className={styles.button}
          action={increasePage}
        >
          <BsArrowRightCircleFill />
        </button>
      </div>
    </motion.div>
  );
}

export default Pagination;
