import styles from "@/styles/Button.module.css";

function Button({ text, action }) {
  return (
    <button onClick={(e) => action} className={styles.button}>
      {text}
    </button>
  );
}

export default Button;
