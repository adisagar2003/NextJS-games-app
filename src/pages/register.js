import { useEffect, useState } from "react";
import styles from "@/styles/Register.module.css";
import BlurBlob from "@/components/BlurBlob";
import Card from "@/components/Card";
function register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  async function register() {
    let data = JSON.stringify({
      userName: userName,
      password: password,
      profile_image:
        "https://images.unsplash.com/photo-1617957718614-8c23f060c2d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b3JhbmdlJTIwZ3JhZGllbnR8ZW58MHx8MHx8&w=1000&q=80",
      email: email,
    });
    if (userName != "") {
      if (password.length > 7) {
        const response = await fetch("/api/user", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: data, // body data type must match "Content-Type" header
        });

        response.json().then((result) => {
          console.log(result);
          if (result.error) {
            setError(result.error);
          } else {
            location.href = "/";
          }
        });
      } else {
        setError("Password length should be at least 8 characters long");
      }
    }
  }
  function changeText(e, targetFunction) {
    targetFunction(e.target.value);
    if (confirmPassword != password) {
      setError("Passwords don't match");
    } else {
      setError(null);
    }
  }

  useEffect(() => {
    if (confirmPassword != password) {
      setError("Passwords don't match");
    } else {
      setError(null);
    }
  }, [userName, password, confirmPassword]);

  return (
    <div className={styles.registerLayout}>
      <BlurBlob />

      <div className={styles.registerCardBg}>
        <div className={styles.formContent}>
          <input
            type="text"
            placeholder="email"
            onChange={(e) => changeText(e, setEmail)}
          />

          <input
            type="text"
            placeholder="username"
            onChange={(e) => changeText(e, setUserName)}
          />
          <input
            type="text"
            placeholder="password"
            onChange={(e) => changeText(e, setPassword)}
          />
          <input
            type="text"
            placeholder="confirm password"
            onChange={(e) => changeText(e, setConfirmPassword)}
          />
          <button onClick={register}>Register</button>
        </div>
      </div>
      <div className={styles.registerForm}>
        {error && <div>{error}</div>}
        <div className={styles.AvatarCards}></div>
      </div>
    </div>
  );
}

export default register;
